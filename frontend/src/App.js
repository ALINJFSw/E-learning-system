import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import AuthContext from "./store/authContext";
import Home from "./pages/home";
import Heading from "./components/navigator/Heading";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if (data && data.token ) {
      login(data.token,data.userData)
    }
  },[])

  const login = (token,userData) => {
      localStorage.setItem("data",JSON.stringify({token :token,userData:userData}))
      setIsLoggedIn(true);
      setToken(token);
      setUserData(userData);
    
  };
  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    setUserData("");
    localStorage.removeItem("data")
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        userData: userData,
        login: login,
        logout: logout,
      }}
    >
    <Heading/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
