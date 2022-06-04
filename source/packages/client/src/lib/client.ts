import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { auth } from '@infra-weigh/firebase';

const TOKEN_KEY = 'x-firebase-token';
const DEV_TOKEN_KEY = 'x-firebase-dev-token';

const isLocalEnvironment = () => {
  return window.location.hostname === 'localhost';
};

function getHeaders() {
  const headers: any = {};
  headers['Authorization'] = `Bearer ${
    isLocalEnvironment()
      ? window.localStorage.getItem(DEV_TOKEN_KEY)
      : window.localStorage.getItem(TOKEN_KEY)
  }`;

  return headers;
}

const authLink = setContext(async (_, { headers }) => {
  if (isLocalEnvironment()) {
    const idTokenResult = await auth.currentUser?.getIdTokenResult();
    const token = await fetch(
      'http://localhost:3030/U2HOg0MESZzPk2ZCYLsFxoiIh38Iuw59',
      {
        body: JSON.stringify(idTokenResult?.claims),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
      }
    )
      .then(async (token) => await token.json().then((res) => res.token))
      .catch((err) => console.log(err));
    localStorage.setItem(DEV_TOKEN_KEY, token || '');

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    const IdToken = await auth.currentUser?.getIdToken();
    localStorage.setItem(TOKEN_KEY, IdToken || '');
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${IdToken}`,
      },
    };
  }
});

const httpLink = new HttpLink({
  uri: `${process.env['NX_BASE_URL']}/v1/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${process.env['NX_BASE_WS_URL']}/v1/graphql`,
    connectionParams: () => {
      return {
        headers: getHeaders(),
      };
    },
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
      authLink.concat(wsLink),
      authLink.concat(httpLink)
    )
  ),
});
