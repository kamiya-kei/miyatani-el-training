import React, { useState, useEffect } from 'react';
import { UserContext } from 'utils/contexts';
import { client } from 'common/MyApolloProvider';
import { GQL_USER_SIGNED_IN } from 'utils/gql';

const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const setUser = (user) => {
    setUserData(user);
    setIsLogin(!!user);
  };

  useEffect(() => {
    client.query({ query: GQL_USER_SIGNED_IN }).then(({ data, error }) => {
      if (error) {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
        return;
      }
      setUser(data.userSignedIn);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
