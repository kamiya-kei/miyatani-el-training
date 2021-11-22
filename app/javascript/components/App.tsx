import React from 'react';
import UserProvider from 'common/UserProvider';
import UtilProvider from 'common/UtilProvider';
import MyApolloProvider from 'common/MyApolloProvider';
import MyRouter from 'MyRouter';

const App = () => {
  return (
    <MyApolloProvider>
      <UtilProvider>
        <UserProvider>
          <MyRouter />
        </UserProvider>
      </UtilProvider>
    </MyApolloProvider>
  );
};

export default App;
