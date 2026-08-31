import { Box, FormControlLabel, FormGroup, Modal, Switch, Typography } from "@mui/material"
import { Paper } from "@mui/material"
import { InputBase, Stack } from "@mui/material"
import { IconButton, TextField, Button } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/error";
import router from "../../Routes";


interface ChatListAddProps {
    open: boolean,
    handleClose: () => void
}

const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
    const [isPrivate, setIsPrivate] = useState(false)
    const [error, setError] = useState("")
    const [createChat] = useCreateChat()
    const [name, setName] = useState("")
    const onClose = () => {
        setName("");
        setError("")
        setIsPrivate(false)
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
                    <FormGroup>
                        <FormControlLabel
                            style={{ width: 0 }}
                            control={
                                <Switch
                                    defaultChecked={isPrivate}
                                    value={isPrivate}
                                    onChange={(event) => { setIsPrivate(event.target.checked) }}

                                />
                            }
                            label="Private"
                        />


                    </FormGroup>
                    {
                        isPrivate ? (
                            <Paper sx={{ p: "2px 4 px", display: "flex", alignItems: "center" }}>
                                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Users" />
                                <IconButton sx={{ p: "10px" }}>
                                    <SearchIcon />

                                </IconButton>
                            </Paper>
                        ) : (
                            <TextField
                                label="Name"
                                error={!!error}
                                helperText={error}
                                onChange={(event) => setName(event.target.value)} />
                        )
                    }
                    <Button variant="outlined" onClick={async () => {
                        if (!name.length) {
                            setError("Chat name is required")
                            return;
                        }
                        try {

                            const chat = await createChat({
                                variables: {
                                    createChatInput: { isPrivate, name: name || undefined }
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