import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChatListItem from './chat-list-item/ChatListItem';
import ChatListHeader from './chat-list-header/ChatListHeader';
import { Stack } from '@mui/material';
import { useState } from 'react';
import ChatListAdd from './chat-list-add/ChatListAdd';
import { useGetChats } from '../../hooks/useGetChats';
import { useEffect } from 'react';
import { usePath } from '../../hooks/usePath';
import { useMessageCreated } from '../../hooks/useMessageCreated';
const ChatList = () => {

    const [chatListAddVisible, setChatListAddVisible] = useState(false)
    const { data } = useGetChats();
    const [selectedChatId, setSelectedChatid] = useState("")
    const { path } = usePath();

    useMessageCreated({
        chatIds: data?.chats.map((chat) => chat._id) || []
    })
    useEffect(() => {
        const pathSplit = path.split("chats/")
        if (pathSplit.length === 2) {
            setSelectedChatid(pathSplit[1])
        }
    }, [path])
    return (
        <>
            <ChatListAdd open={chatListAddVisible} handleClose={() => setChatListAddVisible(false)} ></ChatListAdd>
            <Stack>
                <ChatListHeader handleChatAdd={() => { setChatListAddVisible(true) }} />
                <Divider />
                <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: "80vh", overflow: "auto" }}>

                    {
                        data?.chats && [...data.chats].sort((chatA, chatB) => {
                            if (!chatA.latestMessage) {
                                return -1;
                            }
                            const aTime = chatA.latestMessage ? new Date(chatA.latestMessage?.createdAt).getTime() : 0
                            const bTime = chatB.latestMessage ? new Date(chatB.latestMessage?.createdAt).getTime() : 0
                            return (
                                aTime - bTime
                            )
                        })

                            .map((chat) => (
                                <ChatListItem chat={chat} selected={chat._id === selectedChatId} />
                            )).reverse()
                    }
                </List>
            </Stack>
        </>
    );

}


export default ChatList 