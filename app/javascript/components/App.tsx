import React from 'react';
import UserProvider from 'common/UserProvider';
import MyApolloProvider from 'common/MyApolloProvider';
import MyRouter from 'MyRouter';

const App = () => {
  return (
    <MyApolloProvider>
      <UserProvider>
        <MyRouter />
      </UserProvider>
    </MyApolloProvider>
  );
};

export default App;
