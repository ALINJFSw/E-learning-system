import { Link } from "react-router-dom";
import "./Button.css";
const Button = (props) => {
  if (props.to) {
    return (
      <Link to={props.href} className={`button ${props.class}`}>
        {props.children}
      </Link>
    );
  }


  return (
    <button
      className={`${props.gene ? "myButton" : "button"}`}
   
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      
    >
      {props.children}
    </button>
  );
};

export default Button;
