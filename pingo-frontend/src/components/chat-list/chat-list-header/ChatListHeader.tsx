import { AppBar, IconButton } from "@mui/material"
import { Toolbar } from "@mui/material"
import AddCircle from "@mui/icons-material/AddCircle"
interface ChatListHeaderProps {
    handleChatAdd: () => void
}


const ChatListHeader = ({ handleChatAdd }: ChatListHeaderProps) => {

    return (<>
        <AppBar position="static" color="transparent">
            <Toolbar>
                <IconButton size="large" edge="start" onClick={handleChatAdd}>
                    <AddCircle />
                </IconButton>
            </Toolbar>

        </AppBar>
    </>)
}

export default ChatListHeader























