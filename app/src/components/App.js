import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { useDispatch } from "react-redux";
import { parseToken } from "services/token";
import { setLoggedInUser } from "reducers/auth";
import "assets/style/index.scss";

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = parseToken();
    if(token) dispatch(setLoggedInUser(token));
  }, []);

  return <RouterProvider router={router} />
};

export default App;
