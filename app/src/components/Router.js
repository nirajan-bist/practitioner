import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "ErrorPage";
import Login from "components/auth/Login";
import Signup from "components/auth/Signup";
import Dashboard from "components/dashboard/Dashboard";
import Practitioner from "components/dashboard/Practitioner";
import AuthenticatedRoute from "hoc/AuthenticatedRoute";
import UnAuthenticatedRoute from "components/auth";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/practitioner",
        element: (
          <AuthenticatedRoute>
            <Practitioner />
          </AuthenticatedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <UnAuthenticatedRoute>
            <Login />
          </UnAuthenticatedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <UnAuthenticatedRoute>
            <Signup />
          </UnAuthenticatedRoute>
        ),
      },
      {
        path: "/",
        element: (
          <AuthenticatedRoute>
            <Practitioner />
          </AuthenticatedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
