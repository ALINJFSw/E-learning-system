import { useRef } from "react";

const Register = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    
  
   return (
    <div className="reg-container">
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="register-form">
      <div className="name-container">
          <div className="small">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" placeholder="First Name" ref={firstNameRef}/>
          </div>
          <div className="small">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" placeholder="Last Name" ref={lastNameRef}/>
          </div>
        </div>
        <div>
          <label htmlFor="email">Choose a Username</label>
          <input id="email" placeholder="email" ref={emailRef}/>
        </div>
        <div>
          <label htmlFor="password">Enter your Password</label>
          <input id="password" type="password" placeholder="Password" ref={passwordRef}/>
        </div>
      
        {/* <div>
          <label htmlFor="image">Upload your image</label>
          <input id="image" type="file" ref={imageRef}/>
        </div> */}
        
        <button type="submit" className="register-button" id="register-button" >Register</button>
        <div className="register-link">
          Already registered? <a href="/login">Login Now</a>
        </div>
      </div>
    </div>
  </div>

   )
}

export default Register;