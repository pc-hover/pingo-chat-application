import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { API_URL } from "./urls";
const client = new ApolloClient({
    link: new HttpLink({ uri: API_URL }),
    cache: new InMemoryCache(),
});
export default client