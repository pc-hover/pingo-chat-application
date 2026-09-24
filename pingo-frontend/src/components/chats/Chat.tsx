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
    const handleCreateMessage = async () => {
        await createMessage({ variables: { createMessageInput: { content: message, chatId } } })
        setMessage("")
        scrollToBottom();
    }
    const [messages, setMessages] = useState<MessageFragmentFragment[]>([]);

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

    const scrollToBottom = () => {
        if (boxRef.current) boxRef.current.scrollTop = 0
    }
    const location = useLocation()
    const boxRef = useRef<HTMLDivElement | null>(null)

    const { messagesCount, countMessages } = useCountMessages(chatId)

    useEffect(() => {
        countMessages()
    }, [countMessages])


    useEffect(() => {

        if (messages && messages.length <= PAGE_SIZE) {
            setMessage("")
            scrollToBottom();
        }
    }, [location.pathname, messages])



    return <>
        <Stack
            sx={{
                height: '100%', justifyContent: "space-between"

            }}>
            <h1> {data?.chat.name}</h1>
            <Box id="chatBox" sx={{
                maxHeight: "70vh", overflow: "auto", scrollbarWidth: "none",
                display: "flex",
                flexDirection: "column-reverse",
                msOverflowStyle: "none",
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

                    {
                        messages && [...messages].sort((messageA, messageB) =>
                            new Date(messageB.createdAt).getTime() -
                            new Date(messageA.createdAt).getTime()
                        ).map(message => (
                            <Grid container sx={{ marginBottom: "1rem", alignItems: "center" }} key={message._id}>
                                <Grid size={{ xs: 2, lg: 1 }}>
                                    <Avatar src="" sx={{ width: 52, height: 52 }} />
                                </Grid>
                                <Grid size={{ xs: 10, lg: 11 }}>
                                    <Stack>
                                        <Paper sx={{ width: "fit-content" }}>
                                            <Typography sx={{ padding: "0.9rem" }}>
                                                {message.content}
                                            </Typography>
                                        </Paper>
                                        <Typography variant="caption"
                                            sx={{ marginLeft: "0.25" }}
                                        >
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })} - {" "}
                                            {new Date(message.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        ))}


                </InfiniteScroll>

            </Box>
            <Paper sx={{
                p: '2px 4px',
                display: 'flex',
                justifySelf: "flex-end",
                alignItems: "center",
                width: "100%",
                margin: "1rem 0"
            }}>
                <InputBase
                    onChange={(event) => setMessage(event.target.value)}
                    sx={{ ml: 1, flex: 1, width: '100%' }} placeholder="Message"
                    value={message}
                    onKeyDown={async (event) => {
                        if (event.key == 'Enter') {
                            await handleCreateMessage()
                        }
                    }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    onClick={handleCreateMessage}
                    color="primary"
                    sx={{ p: "10px" }}
                >
                    <SendIcon />
                </IconButton >

            </Paper>
        </Stack >
    </>

}

export default Chat