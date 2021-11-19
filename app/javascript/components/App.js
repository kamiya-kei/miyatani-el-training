import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'utils/contexts';
import axios from 'module/axios_with_csrf';
import Top from 'page/Top';
import TaskPost from 'page/TaskPost';
import TaskEdit from 'page/TaskEdit';
import SignIn from 'page/SignIn';

const App = () => {
  const [user, setUser] = useState({
    isLogin: false,
    user: null,
  });

  useEffect(() => {
    axios
      .post('/users/signed_in')
      .then((res) => {
        const user = res.data.user;
        setUser({ user, isLogin: !!user });
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/tasks/new" element={<TaskPost />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
          <Route path="/users/sign_in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
