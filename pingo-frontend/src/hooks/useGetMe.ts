import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const GET_ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

interface MeQueryResult {
  me: {
    _id: string;
    email: string;
  };
}

const useGetMe = () => {
  return useQuery<MeQueryResult>(GET_ME);
};
export { useGetMe }

