import useDocumentTitle from "hooks/useDocumentTitle";
import { useSelector } from "react-redux";

import { Link, Outlet } from "react-router-dom";
import { logOut } from "utils/user";

export default function Dashboard() {
  useDocumentTitle("Dashboard");

  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth.user;

  return (
    <div className="main-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
        <Link className="navbar-brand" to={"/practitioner"}>
          PMS App
        </Link>

        <ul className="navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="nav-item active">
                <Link className="nav-link" to={"/signup"}>
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={"/practitioner"}>
                  Practitioner
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link hover" onClick={logOut} >
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
