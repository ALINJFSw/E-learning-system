import { useContext, useEffect, useState } from "react";
import UseHttp from "../../hooks/http-hook";
import AuthContext from "../../store/authContext";
import Modal from "../UIElements/Modal";
import ClassCard from "./class_card";

const ClassList = (props) => {
  const [showModal,setShowModal] = useState(false)
  const [message,setMessage] = useState("")
  const [title,setTitle] = useState("")
  const closeModal = () => {
    setShowModal(false)
  };
  const Auth = useContext(AuthContext);
  const [classes, setclasses] = useState([]);
  useEffect(() => {
    let Url = "getAllClasses";
    if (!!props.myclasses) {
      Url = "getClasses";
    }
    const sendRequest = async () => {
      const Response = await UseHttp("users/" + Url, "GET", "", {
        authorization: "Bearer " + Auth.token,
      });
      setclasses(Response.classes);
    };
    if (Auth.token) {
      sendRequest();
    }
  }, [Auth.token]);

  const addClass = async (classId,className) => {
    const data = { classId };
    const Response = UseHttp("users/addClass", "POST", data, {
      authorization: "Bearer " + Auth.token,
      "Content-Type": "application/json",
    });
    if(Response.status == "succes"){
      setMessage(" class has been added to your classes")
      setTitle("Class Added");
      setShowModal(true)
    }
    else {
      setMessage(Response.message)
      setTitle("Error");
      setShowModal(true)
    }
  };

  const requestWithdraw = async (classId,className) => {
    const data = { classId };
    const Response = UseHttp("users/askToWithdrawClass", "POST", data, {
      authorization: "Bearer " + Auth.token,
      "Content-Type": "application/json",
    });
    if(Response.status == "succes"){
      setMessage(className+" class withdraw Request has been sent to your admin")
      setTitle("Withdraw Requeset");
      setShowModal(true)
    }
    else {
      setMessage(Response.message)
      setTitle("Error");
      setShowModal(true)
    }
  };
  console.log(message);
  return (
    <div className="class-list">
      <Modal
        message={message}
        title={title}
        onCancel={closeModal}
        show={showModal}
      />

      <h1>{props.title}</h1>

      {classes &&
        classes.map((myClass, index) => (
          <ClassCard
            onWithdraw={requestWithdraw}
            onAdd={addClass}
            key={index}
            data={myClass}
            my={!!props.myclasses}
          />
        ))}
      {/* <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
     */}
    </div>
  );
};

export default ClassList;
