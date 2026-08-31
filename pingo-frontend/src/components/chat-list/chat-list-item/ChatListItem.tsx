
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import router from '../../Routes';
import type { ChatFragmentFragment } from "../../../gql/graphql"

interface ChatListProps {
    chat: ChatFragmentFragment
    selected: boolean
}

const ChatListItem = ({ chat, selected }: ChatListProps) => {
    return (<>

        <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton onClick={() => { router.navigate(`/chats/${chat._id}`) }} selected={selected}>

                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={chat.name}
                    secondary={
                        <>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                Priyanshu
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </>
                    }
                />
            </ListItemButton>
        </ListItem >

    </>)
}

export default ChatListItem