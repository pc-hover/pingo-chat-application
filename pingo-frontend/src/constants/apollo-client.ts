import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions"
import onLogout from "../utils/onLogout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { SetContextLink } from "@apollo/client/link/context"
import { getToken } from "../utils/token";

// let client: ApolloClient;

const logoutLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        console.log(error)
        const statusCode = (error.errors[0]?.extensions?.originalError as any)?.statusCode;

        if (statusCode === 401 && !excludedRoutes.includes(window.location.pathname)) {
            onLogout()
        }
    }
});

const authLink = new SetContextLink((prevContext) => ({
    headers: {
        ...prevContext.headers,
        authorization: getToken(),
    },
}));

const httpLink = new HttpLink({ uri: `${API_URL}/graphql`, credentials: 'include' });
const wsLink = new GraphQLWsLink(
    createClient({
        url: `${WS_URL}/graphql`,
        connectionParams: {
            token: getToken()
        }
    })
)

const splitLink = ApolloLink.split(

    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    }, wsLink, httpLink
)


const client = new ApolloClient({
    link: logoutLink.concat(authLink).concat(splitLink),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    chats: {
                        keyArgs: false,
                        merge,
                    },
                    messages: {
                        keyArgs: ["chatId"],
                        merge
                    }
                },
            },
        },
    }),
});


function merge(existing: any[] = [], incoming: any[], { args }: any) {
    const merged = existing.slice(0);
    const offset = args?.skip ?? 0;
    for (let i = 0; i < incoming.length; i++) {
        merged[offset + i] = incoming[i];
    }
    return merged;
}
export default client;