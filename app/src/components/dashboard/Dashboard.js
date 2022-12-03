import useDocumentTitle from "hooks/useDocumentTitle";

import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  useDocumentTitle("Dashboard");

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to={'/practitioner'}>PMS App</Link>
 
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to={'/signup'}>Signup</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'/login'}>Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'/practitioner'}>Practitioner</Link>
      </li>
    </ul>
  
</nav>
<Outlet/>
</div>
  );
}
