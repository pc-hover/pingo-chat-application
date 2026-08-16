import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type { User } from "../models/User";

const GET_ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

const useGetMe = () => {
  const data = useQuery(GET_ME)
  return data
}

export { useGetMe }