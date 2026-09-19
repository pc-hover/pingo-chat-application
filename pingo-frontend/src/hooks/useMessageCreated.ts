import { useSubscription } from "@apollo/client/react";
import { graphql } from "../gql"
import type { MessageCreatedSubscriptionVariables } from "../gql/graphql"
import { updateMessages } from "../cache/messages";
import { updateLatestMessage } from "../cache/latest-message";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
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
                updateLatestMessage(client.cache, data.data.messageCreated)
            }
        }
    })
}