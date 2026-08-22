import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChatListItem from './chat-list-item/ChatListItem';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { Stack } from '@mui/material';
import { useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';

const ChatList = () => {

    const [chatListAddVisible, setChatListAddVisible] = useState(false)
    return (
        <>
            <ChatListAdd open={chatListAddVisible} handleClose={() => setChatListAddVisible(false)} ></ChatListAdd>
            <Stack>
                <ChatListHeader handleChatAdd={() => { setChatListAddVisible(true) }} />
                <Divider />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: "80vh", overflow: "auto" }}>
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                </List>
            </Stack>
        </>
    );

}


export default ChatList 