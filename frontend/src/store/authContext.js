import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token :"",
    userData:{},
    login: ()=>{},
    logout: ()=>{}
})

export default AuthContext;