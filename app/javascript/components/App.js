import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Top from "page/Top";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
