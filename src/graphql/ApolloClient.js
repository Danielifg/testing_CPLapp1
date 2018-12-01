import ApolloClient from "apollo-client"
import gql from 'graphql-tag'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import  { withClientState } from 'apollo-link-state'
import { ApolloLink } from 'apollo-link'
import { onError } from "apollo-link-error";



//export const SERVER = 'http://localhost:4000'
export const SERVER = 'http://localhost:8080/graphql'
const cache = new InMemoryCache();



/* ****************** ApolloClient ******************** */
/* **************************************************** */

const defaultState = {
    detailsTable : {
        __typename:'detailsTable',
        open: 'false',
        detailsTableCurrentDates : 'Date.now()'
    }
}


export const httpLink = new HttpLink({
    uri: SERVER,
    headers: {
      ContentType: `application/json`,
      AccessControlAllowOrigin: `*`,
      Accept:`application/json`
    },
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

const stateLink = withClientState ({
    cache ,
    defaults: defaultState,
    resolvers :{
        // Actions
        Mutation:{
            showDetailsTable: (_, { index, value }, { cache }) => {
                const query = gql`
                  query getTableDetailsArgs{
                               detailsTable @client{
                                    open
                                    detailsTableCurrentDates
                                      }
                                  }
                                `
            const previousState = cache.readQuery({ query });

            // Resolvers
            const data = {
                ... previousState,
                detailsTable:{
                    ... previousState.detailsTable,
                    open: index,
                    detailsTableCurrentDates: value
                }
            }
            cache.writeData({ query, data})
          }
        }
    },
    errorLink
})

const link = ApolloLink.from([stateLink, httpLink]);

export const  client =  new ApolloClient({
    link,
    cache
});
