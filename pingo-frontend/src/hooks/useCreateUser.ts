//custom reaxt hook 
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"

//user input
export interface CreateUserInput {
  createUserInput: {
    email: string;
    password: string
  }
}

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
    }
  }
`

//Data type is required
const useCreateUser = () => {
  return useMutation(CREATE_USER)
};
export { useCreateUser }