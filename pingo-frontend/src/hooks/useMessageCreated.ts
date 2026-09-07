import { useSubscription } from "@apollo/client/react";
import { graphql } from "../gql"
import type { MessageCreatedSubscriptionVariables } from "../gql/graphql"
import { updateMessages } from "../cache/messages";

const messageCreatedDocument = graphql(`

subscription messageCreated($chatId:String!){
messageCreated(chatId:$chatId){
...MessageFragment
}
}
`);

export const useMessageCreated = (variables: MessageCreatedSubscriptionVariables) => {

    return useSubscription(messageCreatedDocument, {
        variables, onData: ({

            client, data
        }) => {
            if (data.data) {
                updateMessages(client.cache, data.data.messageCreated)
            }
        }
    })
}