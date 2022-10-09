import React from "react";
import { Outlet, Link } from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <div>Hello World!</div>

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
