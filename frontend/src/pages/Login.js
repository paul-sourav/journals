import React, { useEffect, useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";
import  axios from 'axios';

const Signin = () => {
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/board");
    }
  });

  async function submitHandler(e) {
    e.preventDefault();
    /* let user = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    user = await user.json();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      navigate("/board");
    } else {
      alert("please fill all the fields correctly.");
    } */
    
   let user = await  axios.post("http://localhost:5000/login",{ email, password });
   if(user.data.email){
    localStorage.setItem("user", JSON.stringify(user.data));
    console.log(user);
    navigate("/board");
   }else{
    alert("please fill all the fields correctly.");
   }
  
  }
  return (
    <>
      <div className="container">
        <div className="left-element">
          <h1 id="head1">Journal </h1>
          <h1 id="head2">Planner</h1>
          <h2 style={{ color: "GrayText" }}>{new Date().getFullYear()}</h2>

          <div className="login">
            <Link to={"/signin"}>
              <p>Signin as a new user</p>
            </Link>
          </div>
        </div>

        <div className="middle-line"></div>
        <div className="line"></div>

        <div className="right-element">
          <form onSubmit={submitHandler}>
            <h1> Login</h1>

            <input
              type="text"
              name="email"
              placeholder="Example@mail.com"
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit">Go your Journal</button>
          </form>
        </div>
      </div>
      <Features />
    </>
  );
};

export default Signin;
