import { useContext } from "react";
import Heading from "../components/navigator/Heading";
import AuthContext from "../store/authContext";

const Home = () => {
    const Auth = useContext(AuthContext)
    console.log(Auth.token);
    return (
        <>
           
        </>
    )
}

export default Home;