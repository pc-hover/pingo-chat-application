//custom reaxt hook 
import { useMutation } from "@apollo/client/react"
import { graphql } from "../gql";


const createUserDocument = graphql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
     email
    }
  }
`);

//Data type is required
const useCreateUser = () => {
  return useMutation(createUserDocument)
};
export { useCreateUser }