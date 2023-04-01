import { useRef } from "react";

const Login = () => {
    const  usernameRef = useRef()
    const  passwordRef = useRef()
    return (
        <div className="lgn-container">
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <div className="login-form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your Username" ref={usernameRef}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your Password" ref={passwordRef}/>
            <button type="submit" className="login-button" id="login-button"  >Login</button>
            <div className="register-link">
              First Time User<a href="/register">Register Now</a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login;