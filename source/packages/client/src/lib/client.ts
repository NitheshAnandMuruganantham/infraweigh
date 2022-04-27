import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

function getHeaders() {
  // eslint-disable-next-line prefer-const
  let headers: any = {};
  const token = window.localStorage.getItem('x-firebase-token');
  headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

const httpLink = new HttpLink({
  uri: `${process.env['NX_BASE_URL']}/v1/graphql`,
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env['NX_BASE_WS_URL']}/v1/graphql`,
    connectionParams: () => {
      return {
        headers: getHeaders(),
      };
    },
    // keepAlive: true,
    // shouldRetry: true,
  })
);

const errorLink = onError((error) => {
  console.log(error);
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    )
  ),
});
