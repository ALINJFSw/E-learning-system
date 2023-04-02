import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UseHttp from "../hooks/http-hook";
import AuthContext from "../store/authContext";

const Login = () => {
    const Auth = useContext(AuthContext)
    const  emailRef = useRef()
    const  passwordRef = useRef()
    const navigate = useNavigate()
    const login = async () => {
      
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const data = {
        email,
        password,
      };
  
      
     try {
      const Response = await UseHttp("auth/login","POST",data,{
        "Content-Type": "application/json"
      });
      if(Response.status == "succes"){
        console.log(Response);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        Auth.login(Response.token,Response.user)
        navigate("/")
        }
     } catch (error) {
      console.error();
     }
    };    return (
        <div className="lgn-container">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <div className="login-form">
            <label htmlFor="emaik">Email</label>
            <input type="text" id="email" placeholder="Enter your email" ref={emailRef}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your Password" ref={passwordRef}/>
            <button onClick={login} className="login-button" id="login-button"  >Login</button>
            <div className="register-link">
              First Time User<a href="/register">Register Now</a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login;