import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from  'axios';
import "./profile.css";
const Profile = () => {
    const navigate = useNavigate()
    const auth = localStorage.getItem('user');
    let profile = JSON.parse(auth);

    function submitHandler(){
        localStorage.clear('user');
        navigate("/signin")
    }

    let deleteAccountHandler =async ()=>{
      let con = window.confirm('Are You  sure You  want to Delete Your account');
      if(con){
        try {
          const {data}  = await axios.delete(`http://localhost:5000/delete/${profile._id}`);
          if(data){
            alert('account deleted ')
            localStorage.clear("user")
            navigate('/signin')
          }
        } catch (error) {
          alert(error)
          console.log('error detected'+ error)
        }
      }else{
        alert('cancelled')
      }
    }

    let deleteAllData  =  async ()=>{
      let con =  window.confirm('Are You sure You want to Delete All Data');
      try {
        if(con){
          const {data} = await axios.delete(`http://localhost:5000/deleteAll/${profile._id}`)
          if(data){
            alert("deleted")
            navigate('/')
          }
        }else{
          alert("cancelled")
        }
      } catch (error) {
        alert("error occered")
        console.log(error)
      }
    }

  return (
    <div className='profile' style={{height:"83vh", width:"100%"}}>
      <h1 className='text-capitalize'>{profile.name}</h1>
      <p>Email:{profile.email}</p>
      <p>phone:{profile.phone}</p>
      <button className='btn btn-dark mb-2'style={{width:"18rem"}} onClick={()=>{navigate("/accountUpdate")}} >Update Profile</button>
      <button className='btn btn-dark mb-2'style={{width:"18rem"}} onClick={deleteAllData}>Delete all Data</button>
      <button className='btn btn-danger mb-2'style={{width:"18rem"}} onClick={deleteAccountHandler} >Delete Account</button>
      <button className='btn btn-success' mb-2 onClick={submitHandler} style={{width:"18rem"}} >
            Logout  
      </button>
    </div>
  )
}

export default Profile
