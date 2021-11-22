import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'utils/contexts';

import Top from 'page/Top';
import TaskPost from 'page/TaskPost';
import TaskEdit from 'page/TaskEdit';
import SignIn from 'page/SignIn';
import SignUp from 'page/SignUp';
import UnSignedTop from 'page/UnSignedTop';
import AdminTop from 'page/AdminTop';
import AdminUserCreate from 'page/AdminUserCreate';

const MyRouter = () => {
  const { isLogin } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogin ? <Top /> : <UnSignedTop />} />
        <Route path="/tasks/new" element={<TaskPost />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        <Route path="/users/sign_in" element={<SignIn />} />
        <Route path="/users/sign_up" element={<SignUp />} />
        <Route path="/admin" element={<AdminTop />} />
        <Route path="/admin/users/new" element={<AdminUserCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
