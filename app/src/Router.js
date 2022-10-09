import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "ErrorPage";
import Login from "components/Login";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
