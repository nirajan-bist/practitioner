import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "ErrorPage";
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";
import Dashboard from "components/dashboard/Dashboard";
import Practitioner from "components/dashboard/Practitioner";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/practitioner",
        element: <Practitioner />,
      },
      {
        path: "/home",
        element: <App />,
        
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
