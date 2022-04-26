import { ApolloProvider } from '@apollo/client';
import { FunctionComponent } from 'react';
import client from './ApolloClient';

interface ClientProps {
  children: React.ReactNode;
}

const Client: FunctionComponent<ClientProps> = (props) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default Client;
