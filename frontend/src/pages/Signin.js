import React, { useEffect, useState } from "react";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";

const Signin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, SetEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
       const auth = localStorage.getItem('user');
       if(auth){
        navigate("/board")
       }
    })

   async function submitHandler(e) {
        e.preventDefault();
        let newUser = await fetch("http://localhost:5000/signin",{
            method:"post",
            body:JSON.stringify({name,email,phone,password}),
            headers:{"content-type":"application/json"}
        });
        newUser = await newUser.json();
       if(newUser.name){
         console.log(newUser)
         localStorage.setItem("user",JSON.stringify(newUser)) 
         navigate("/board")
       }
    else{
        alert("this user alreay have an account")
        navigate("/login")
    }        
    }

    return (
        <>
            <div className="container">
                <div className="left-element">
                    <h1 id="head1">Journal </h1>
                    <h1 id="head2">Planner</h1>
                    <h2 style={{color:'GrayText'}} >{new Date().getFullYear()}</h2>

                    <div className="login">
                        <Link to={"/login"}>
                            <p>Login to your Journal</p>
                        </Link>
                    </div>  
                </div>

                <div className="middle-line"></div>
                <div className="line"></div>

                <div className="right-element">
                    <form onSubmit={submitHandler}>
                        <h1>Sign in</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="The planner belongs to"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Example@mail.com"
                            onChange={(e) => {
                                SetEmail(e.target.value);
                            }}
                        />
                        <input
                            type="number"
                            name="phone"
                            placeholder="+1 3503556895"
                            onChange={(e) => {
                                setPhone(e.target.value);
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
                        <button type="submit">Start your Journal</button>
                    </form>
                </div>
            </div>
            <Features/>
        </>
    );
};

export default Signin;
