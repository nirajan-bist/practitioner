import React from "react";
import { Outlet, Link } from "react-router-dom";

import useDocumentTitle from "hooks/useDocumentTitle";

const App = (props) => {
  useDocumentTitle("Home");

  return (
    <div>
      <div>Welcome to the Practitioner Management Portal</div>

      <nav>
        <ul>
          <li>
            <Link to={`login`}>Login</Link>
          </li>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;
