import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";

let client: ApolloClient;

const logoutLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        console.log(error)
        const statusCode = (error.errors[0]?.extensions?.originalError as any)?.statusCode;

        if (statusCode === 401 && !excludedRoutes.includes(window.location.pathname)) {
            router.navigate('/login');
            client?.resetStore();
        }
    }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: 'include' });

client = new ApolloClient({
    link: logoutLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client; 777