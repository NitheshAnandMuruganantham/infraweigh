import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import decode from 'jwt-decode';
import { auth } from './firebase';

function getHeaders() {
  const headers: any = {};
  headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

  return headers;
}

const authLink = setContext(async (_, { headers }) => {
  try {
    const PresistedToken: any = sessionStorage.getItem('token');
    const jwtDecoded: any = decode(PresistedToken);
    const expired = jwtDecoded.exp < (Date.now() - 1000 * 60 * 5) / 1000;

    if (expired) {
      console.log('called');
      const idToken: any = await auth.currentUser?.getIdToken();

      const data = await fetch(
        import.meta.env['VITE_SERVER_URL'] + '/auth/refresh/firebase',
        {
          headers: {
            authorization: idToken,
          },
          method: 'POST',
        }
      );
      const tokenData = await data.text();
      sessionStorage.setItem('token', tokenData);
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${tokenData}`,
        },
      };
    } else {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${PresistedToken}`,
        },
      };
    }
  } catch {
    sessionStorage.clear();
    await auth.signOut().catch();
    window.location.replace('/login');
  }
});

const httpLink = new HttpLink({
  uri: `${import.meta.env['VITE_BASE_URL']}/v1/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env['VITE_BASE_WS_URL']}/v1/graphql`,
    connectionParams: () => {
      return {
        headers: getHeaders(),
      };
    },
  })
);

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'invalid-headers':
            sessionStorage.clear();
            window.location.replace('/login');
            break;
        }
      }
    }
  }
);

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
      authLink.concat(wsLink),
      authLink.concat(httpLink)
    )
  ),
});
