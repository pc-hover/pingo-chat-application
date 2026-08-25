import { useQuery } from "@apollo/client/react"
import { graphql } from "../gql"

export const getChatsDocument = graphql(`
query Chats{
chats{
...ChatFragment
}

}
`)
const useGetChats = () => {
    const chats = useQuery(getChatsDocument);
    console.log("USE GET ME TEST ", chats)
    return chats
}

export { useGetChats }