
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface ChatListProps {
    name?: string | null;
}

const ChatListItem = ({ name }: ChatListProps) => {
    return (<>


        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={name}
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
        </ListItem >

    </>)
}

export default ChatListItem