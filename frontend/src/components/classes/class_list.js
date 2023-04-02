import { useContext, useEffect, useState } from "react";
import UseHttp from "../../hooks/http-hook";
import AuthContext from "../../store/authContext";
import ClassCard from "./class_card";

const ClassList = (props) => {
    const Auth = useContext(AuthContext)
    const [classes,setclasses] = useState([])
    useEffect(()=> {
      let Url = "getAllClasses"
        if (!!props.myclasses) {
          Url = "getClasses"
        }
        const sendRequest = async () =>{
            const Response = await UseHttp("users/"+Url,"GET","",{
                'authorization' : "Bearer " + Auth.token,
            })
              setclasses(Response.classes)
            
        }
        if (Auth.token) {
         sendRequest()
        }
    },[Auth.token])

    const addClass = async (classId) => {
      const data = {classId}
      const Response = UseHttp("users/addClass","POST",data,{
        'authorization' : "Bearer " + Auth.token,
        "Content-Type": "application/json"

      })
    }

    const requestWithdraw = async(classId) => {
      const data = {classId}
      const Response = UseHttp("users/askToWithdrawClass","POST",data,{
        'authorization' : "Bearer " + Auth.token,
        "Content-Type": "application/json"

      })
    }
  return (
    <div className="class-list">
    <h1>{props.title}</h1>
      
    {classes && classes.map((myClass,index) => 
      <ClassCard onWithdraw = {requestWithdraw} onAdd ={addClass} key={index} data = {myClass} my = {!!props.myclasses}/>

    )}
      {/* <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
      <ClassCard my = {!!props.myclasses}/>
     */}
     
    </div>
  );
};

export default ClassList;
