import { useLocation, useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat"
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState, useRef, useEffect } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import type { MessageFragmentFragment } from "../../gql/graphql";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroll-component";

const Chat = () => {
    const params = useParams()
    const chatId = params._id!
    const { data } = useGetChat({ _id: chatId })
    const [message, setMessage] = useState("")
    const [createMessage] = useCreateMessage()
    const { data: existingMessages, fetchMore } = useGetMessages({ chatId, skip: 0, limit: PAGE_SIZE })
    const [messages, setMessages] = useState<MessageFragmentFragment[]>([]);
    const location = useLocation()
    const boxRef = useRef<HTMLDivElement | null>(null)
    const { messagesCount, countMessages } = useCountMessages(chatId)

    const handleCreateMessage = async () => {
        await createMessage({ variables: { createMessageInput: { content: message, chatId } } })
        setMessage("")
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (boxRef.current) boxRef.current.scrollTop = 0
    }

    useEffect(() => {
        if (existingMessages) {
            setMessages(existingMessages.messages)
        }
    }, [existingMessages])

    // useEffect(() => {
    //     const existingLatestMessage = messages[messages.length - 1]?._id;
    //     if (latestMessage?.messageCreated && existingLatestMessage !== latestMessage.messageCreated._id) {
    //         setMessages([...messages, latestMessage.messageCreated])
    //     }
    // }, [latestMessage, messages])

    useEffect(() => {
        countMessages()
    }, [countMessages])

    useEffect(() => {
        if (messages && messages.length <= PAGE_SIZE) {
            setMessage("")
            scrollToBottom();
        }
    }, [location.pathname, messages])

    return (
        <Stack sx={{ height: '100%' }}>


            <Box sx={{ px: 3, py: 2 }}>
                <h1> {data?.chat.name}</h1>
            </Box>

            {/* Messages */}
            <Box
                id="chatBox"
                ref={boxRef}
                sx={{
                    flex: 1,
                    maxHeight: "70vh",
                    overflow: "auto",
                    scrollbarWidth: "none",
                    display: "flex",
                    flexDirection: "column-reverse",
                    msOverflowStyle: "none",
                    px: 3,
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                <InfiniteScroll
                    dataLength={messages.length}
                    next={() => fetchMore({ variables: { skip: messages?.length } })}
                    hasMore={
                        messages && messagesCount ? messages.length < messagesCount : false
                    }
                    inverse={true}
                    loader={""}
                    scrollableTarget="chatBox"
                    style={{ display: "flex", flexDirection: "column-reverse", overflow: "visible" }}
                >
                    <Stack spacing={2.5} sx={{}}>
                        {messages && [...messages]
                            .sort((messageA, messageB) =>
                                new Date(messageA.createdAt).getTime() -
                                new Date(messageB.createdAt).getTime()
                            )
                            .map(message => (
                                <Grid
                                    container
                                    key={message._id}
                                    columnSpacing={2}

                                    sx={{ alignItems: "flex-start" }}
                                >
                                    <Grid size={{ xs: 2, lg: 1 }} sx={{ minWidth: 0 }}>
                                        <Stack spacing={0.5} sx={{ alignItems: "center", minWidth: 0 }}>
                                            <Avatar
                                                src={message.user.imageUrl}
                                                sx={{ width: 52, height: 52 }}
                                            />
                                            <Typography
                                                variant="caption"
                                                noWrap
                                                title={message.user.username}
                                                sx={{ textAlign: "center", maxWidth: "100%" }}
                                            >
                                                {message.user.username}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 10, lg: 11 }} sx={{}}>
                                        <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
                                            <Paper sx={{ width: "fit-content" }}>
                                                <Typography sx={{ px: 2, py: 1.5 }}>
                                                    {message.content}
                                                </Typography>
                                            </Paper>
                                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                                                {new Date(message.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })} - {new Date(message.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))}
                    </Stack>
                </InfiniteScroll>
            </Box>

            {/* Composer */}
            <Box sx={{ px: 3, py: 2 }}>
                <Paper
                    sx={{
                        px: 1,
                        py: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                    }}
                >
                    <InputBase
                        onChange={(event) => setMessage(event.target.value)}
                        sx={{ flex: 1 }}
                        placeholder="Message"
                        value={message}
                        onKeyDown={async (event) => {
                            if (event.key == 'Enter') {
                                await handleCreateMessage()
                            }
                        }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />
                    <IconButton
                        onClick={handleCreateMessage}
                        color="primary"
                        sx={{ p: "10px" }}
                    >
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Stack>
    )
}

export default Chat