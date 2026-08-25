import { useMutation } from "@apollo/client/react"
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chats.fragment"
const createChatDocument = graphql(`
    mutation CreateChat($createChatInput: CreateChatInput!){
    createChat(createChatInput:$createChatInput){
        _id
        userId
        isPrivate
        userIds
        name
        }
    }
    `)

const useCreateChat = () => {

    return useMutation(createChatDocument,
        {

            update(cache, { data }) {
                cache.modify({
                    fields: {
                        chats(existingChats = []) {
                            const newChatRef = cache.writeFragment({
                                data: data?.createChat
                                ,
                                fragment: ChatFragment
                            })
                            return [...existingChats, newChatRef]
                        }
                    }
                })
            }
        }
    );
}

export { useCreateChat }