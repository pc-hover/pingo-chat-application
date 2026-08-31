import { useLocation, useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat"
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState, useRef, useEffect } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {

    const params = useParams()
    const chatId = params._id!
    const { data } = useGetChat({ _id: chatId })
    const [message, setMessage] = useState("")
    const [createMessage] = useCreateMessage(chatId)
    const { data: messages } = useGetMessages({ chatId })
    const handleCreateMessage = async () => {
        await createMessage({ variables: { createMessageInput: { content: message, chatId } } })
        setMessage("")
        scrollToBottom();
    }
    const scrollToBottom = () => divRef.current?.scrollIntoView();
    const location = useLocation()
    const divRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setMessage("")
        scrollToBottom();
    }, [location, messages])
    return <>
        <Stack
            sx={{
                height: '100%', justifyContent: "space-between"

            }}>
            <h1> {data?.chat.name}</h1>
            <Box sx={{
                maxHeight: "70vh", overflow: "auto", scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}
            >
                {messages?.messages.map(message => (
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
                                    })}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                ))}

                <div ref={divRef}></div>

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