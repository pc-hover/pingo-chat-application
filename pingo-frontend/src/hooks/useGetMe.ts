import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
const GET_ME = gql`
query Me{
me{
 _id,
    email
    }
}

`;
const useGetMe = async () => {
    return useQuery(GET_ME)
}
export { useGetMe }