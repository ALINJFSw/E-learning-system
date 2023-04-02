import "./nav-links.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import { useContext } from "react";
const NavLinks = (props) => {
  const Auth = useContext(AuthContext);
  return (
    <nav className={`nav ${props.className}`}>
      <ul>
        <li>{Auth.isLoggedIn && <NavLink to="/profile">Profile</NavLink>}</li>
        <li>{Auth.isLoggedIn && <NavLink to="/newPost">Add Post </NavLink>}</li>
        <li>
          {Auth.isLoggedIn && (
            <NavLink onClick={Auth.logout} to="/register">
              logout
            </NavLink>
          )}
        </li>
        <li>
          {!Auth.isLoggedIn && <NavLink to="/register">Register</NavLink>}
        </li>
        <li>{!Auth.isLoggedIn && <NavLink to="/login">Login</NavLink>}</li>
      </ul>
    </nav>
  );
};

export default NavLinks;
