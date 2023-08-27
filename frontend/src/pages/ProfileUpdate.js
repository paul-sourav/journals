import React, { useState } from "react";
import Popup from 'reactjs-popup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const navigate  = useNavigate()
  const auth = localStorage.getItem("user");
  const profile =  JSON.parse(auth)
  const [name , setUserName]  = useState(profile.name);
  const [email, setUserEmail] =useState(profile.email);
  const [phone, setUserphone] =useState(profile.phone);
  const [checkPassword, setCheckPassword] = useState(false);
  const [password,setUserPassword] = useState("") ;
  const Checkpassswordbox = {width:"100%",height:"75vh", position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:!checkPassword?"none":"flex", flexDirection:"column",alignItems:"center",justifyContent:"center"};

  
  const submitHandler =async (e)=>{
    e.preventDefault()
    console.log(password ,{name,email,phone})
    const {data} = await axios.post(`http://localhost:5000/checkpassword/${profile._id}`,{password})
    console.log(data.result)

    if(data.result){
      const updateUser = await axios.put(`http://localhost:5000/update/${profile._id}`,{name,email,phone})
      if(updateUser.data.result){
          alert("profile Updated")
          const newProfile = await axios.get(`http://localhost:5000/afterUpdateProfile/${profile._id}`)
          console.log(newProfile.data)
          localStorage.setItem("user",JSON.stringify(newProfile.data))
          navigate("/profile")
      }else{
          alert("error occored ❌")
      }
    }else{
      alert("you have entered wrong password")
    }
  }

  const checkPassHandler =()=>{
     setCheckPassword(true)
  }

  return (
    // this section is to update the data
    <div style={{width:"100%",height:"75vh"}}>
      <form onSubmit={submitHandler}>
        <div className="m-auto mt-3" style={{width:"50%"}}>
          <div className="mb-1">
            <label className="form-label">Enter Your Name</label>
            <input type="text" id="name"className="form-control" value={name} onChange={(e)=>{setUserName(e.target.value)}} />
          </div>

          <div className="mb-1">
            <label className="form-label"> Email address</label>
            <input type="email" id="email" className="form-control" value={email}  onChange={(e)=>{setUserEmail(e.target.value)}} />
          </div>
          
          <div className="mb-1">
            <label className="form-label">Enter your Phone</label>
            <input className="form-control" type="number" id="phone" value={phone}  onChange={(e)=>{setUserphone(e.target.value)}}></input>
          </div>

          <button type="button" className="btn btn-primary" onClick={checkPassHandler}>
            Submit
          </button>
        </div>
   

        {/* this section is to check password */}
        <div className="p-5 text-center bg-dark " style={Checkpassswordbox}>
          <input type="password" id="password" className="form-control mb-5" placeholder="Enter password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
          <button type="submit" className="btn btn-outline-primary" onClick={()=>{setCheckPassword(false)}}>Enter</button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdate;
