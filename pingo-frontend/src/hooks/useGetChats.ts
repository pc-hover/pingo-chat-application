import { useQuery } from "@apollo/client/react"
import { graphql } from "../gql"
import type { ChatsQueryVariables } from "../gql/graphql"

export const getChatsDocument = graphql(`
query Chats($skip:Int!,$limit:Int!){
chats(skip:$skip,limit:$limit){
...ChatFragment
}

}
`)
const useGetChats = (variables: ChatsQueryVariables) => {

    const chats = useQuery(getChatsDocument, { variables });
    console.log("USE GET ME TEST ", chats)
    return chats
}

export { useGetChats }