import React, { useState, useEffect } from 'react';
import axios from 'module/axios_with_csrf';
import { UserContext } from 'utils/contexts';

const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUserData] = useState({ id: '', name: '' });
  const [isLogin, setIsLogin] = useState(false);

  const setUser = (user) => {
    setUserData(user);
    setIsLogin(!!user);
  };

  useEffect(() => {
    axios
      .post('/graphql', {
        query: `
      {
        userSignedIn{
          id
          name
        }
      }
    `,
      })
      .then((res) => {
        const user = res.data.data.userSignedIn;
        setUser(user);
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
