import { Box, FormControlLabel, FormGroup, Modal, Switch, Typography } from "@mui/material"
import { Paper } from "@mui/material"
import { InputBase, Stack } from "@mui/material"
import { IconButton, TextField, Button } from "@mui/material"

import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/error";
import router from "../../Routes";


interface ChatListAddProps {
    open: boolean,
    handleClose: () => void
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
    const [error, setError] = useState("")
    const [createChat] = useCreateChat()
    const [name, setName] = useState("")
    const onClose = () => {
        setName("");
        setError("")

        handleClose()
    }
    return <>

        <Modal open={open} onClose={onClose}>
            <Box sx={
                {
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4
                }
            }>
                <Stack spacing={2}>

                    <Typography component="h2" variant="h6" > Add Chat </Typography>

                    <TextField
                        label="Name"
                        error={!!error}
                        helperText={error}
                        onChange={(event) => setName(event.target.value)} />


                    <Button variant="outlined" onClick={async () => {
                        if (!name.length) {
                            setError("Chat name is required")
                            return;
                        }
                        try {

                            const chat = await createChat({
                                variables: {
                                    createChatInput: { name }
                                }
                            })
                            onClose()
                            router.navigate(`/chats/${chat.data?.createChat._id}`)
                        } catch (error) {
                            setError(UNKNOWN_ERROR_MESSAGE)
                        }
                    }}>Save</Button>

                </Stack>
            </Box>
        </Modal>
    </>
}
export default ChatListAdd

// event.target.checked