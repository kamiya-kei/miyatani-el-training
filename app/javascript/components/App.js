import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Top from "page/Top";
import TaskPost from "page/TaskPost";
import TaskEdit from "page/TaskEdit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/tasks/new" element={<TaskPost />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
