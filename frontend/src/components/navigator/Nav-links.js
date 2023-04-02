import "./nav-links.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext"
const NavLinks = (props) => {
  // const Auth = useContext(AuthContext)
  return (
    <nav className={`nav ${props.className}`}>
      {/* <ul>
        <li>
          {Auth.isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
        </li>
        <li>
          {Auth.isLoggedIn && <NavLink to="/newPost">Add Post </NavLink>}
        </li>
        <li>
          {!Auth.isLoggedIn && <NavLink to="/authenticate">Authenticate</NavLink>}
        </li>
        <li>
          {Auth.isLoggedIn && <NavLink onClick={Auth.Logout}  to ='/authenticate'>Logout</NavLink>}
        </li>
      
      </ul> */}
     </nav>
  );
};

export default NavLinks;
