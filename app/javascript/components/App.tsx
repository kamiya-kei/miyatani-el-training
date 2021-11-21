import React from 'react';
import UserProvider from 'common/UserProvider';
import MyRouter from 'MyRouter';

const App = () => {
  return (
    <UserProvider>
      <MyRouter />
    </UserProvider>
  );
};

export default App;
