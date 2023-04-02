import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import AuthContext from "./store/authContext";
import Home from "./pages/home";
import Heading from "./components/navigator/Heading";
import ClassList from "./components/classes/class_list";
import ClassContent from "./components/classes/class-content";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
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
        {isLoggedIn && <Route path="/classes" element={<ClassList myclasses title = "My Class"/>} />}
        {isLoggedIn && <Route path="/content" element={<ClassContent/> }/>}
        <Route path="*" element={<Home />} />

      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
