import React from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const el = document.getElementsByName('csrf-token')[0] as HTMLMetaElement;
  const token = el?.content;
  return { headers: { ...headers, 'X-CSRF-TOKEN': token } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
      // errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'network-only',
      // errorPolicy: 'all'
    },
  },
});

const MyApolloProvider = (props: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default MyApolloProvider;
