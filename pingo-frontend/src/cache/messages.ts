import { ApolloCache } from "@apollo/client";
import { getMessagesDocument } from "../hooks/useGetMessages";
import type { MessageFragmentFragment } from "../gql/graphql";
import { PAGE_SIZE } from "../constants/page-size";

export const updateMessages = (cache: ApolloCache, message: MessageFragmentFragment) => {

    const messagesQueryOptions = {
        query: getMessagesDocument,
        variables: {
            chatId: message.chatId,
            skip: 0,
            limit: PAGE_SIZE
        },
    }
    const messages = cache.readQuery({
        ...messagesQueryOptions
    });

    cache.writeQuery({
        ...messagesQueryOptions,
        data: {
            messages: (messages?.messages || []).concat(message)
        }
    })
}