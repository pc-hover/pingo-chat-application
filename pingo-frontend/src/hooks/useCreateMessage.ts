import { useMutation } from "@apollo/client/react"
import { graphql } from "../gql"

import { updateMessages } from "../cache/messages"

const createMessageDocument = graphql(`
    mutation CreateMessage ($createMessageInput:CreateMessageInput!){
    createMessage(createMessageInput:$createMessageInput){
  ...MessageFragment
    }
    }
    `)
const useCreateMessage = () => {
    return useMutation(createMessageDocument, {
        update(cache, { data }) {
            if (data?.createMessage) {
                updateMessages(cache, data.createMessage)
            }
        }
    })
}
export { useCreateMessage }