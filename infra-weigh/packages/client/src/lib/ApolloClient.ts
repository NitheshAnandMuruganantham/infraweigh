import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

function getHeaders() {
  // eslint-disable-next-line prefer-const
  let headers: any = {};
  const token = window.localStorage.getItem('x-firebase-token');
  headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

const httpLink = new HttpLink({
  uri: 'https://infra-weigh.herokuapp.com/v1/graphql',
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

const wsLink = new WebSocketLink({
  uri: 'wss://infra-weigh.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
    lazy: true,
    timeout: 300000,
    inactivityTimeout: 300000,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  },
});

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
