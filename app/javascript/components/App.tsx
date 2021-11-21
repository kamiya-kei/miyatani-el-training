import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProvider from 'common/UserProvider';
import { UserContext } from 'utils/contexts';

import Top from 'page/Top';
import TaskPost from 'page/TaskPost';
import TaskEdit from 'page/TaskEdit';
import SignIn from 'page/SignIn';
import SignUp from 'page/SignUp';
import UnSignedTop from 'page/UnSignedTop';

const App = () => {
  const { isLogin } = useContext(UserContext);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogin ? <Top /> : <UnSignedTop />} />
          <Route path="/tasks/new" element={<TaskPost />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
          <Route path="/users/sign_in" element={<SignIn />} />
          <Route path="/users/sign_up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
