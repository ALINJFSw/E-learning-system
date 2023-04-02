import { useContext, useState } from "react";
import ClassList from "../components/classes/class_list";
import Heading from "../components/navigator/Heading";
import Modal from "../components/UIElements/Modal";
import AuthContext from "../store/authContext";

const Home = () => {
    const [showModal,setShowModal] = useState(true)
    const closeModal = () => {
        setShowModal(false)
    }
    const openModal = () => {
        setShowModal(true)
    }
    return (
        <>
            <ClassList title= "Choose Your Classes"/>
           {/* <Modal message = "you have a error" title ={"class added"} onCancel ={closeModal}  show={showModal}/> */}
        </>
    )
}

export default Home;