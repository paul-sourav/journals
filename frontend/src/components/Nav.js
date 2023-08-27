import React from 'react';
import './Nav.css'
import { Link, useNavigate } from 'react-router-dom';

const Nav = ()=>{
    const navigate  = useNavigate();
   
    const auth  = localStorage.getItem('user');
     return (
        <>
            <nav className='navbar'>
                {!auth ?
                <>
                <Link to={'/signin'}><li>Signin</li></Link>
                <Link to={'/login'}><li>Login</li></Link>
                </>:
                <>
                <Link to={'/board'}><li>Write Journal</li></Link>
                <Link to={'/'}><li>Your Journal</li></Link>
                <Link to={'/profile'}><li>Profile</li></Link>
                </>
                }
            </nav>
        </>
     )
}

export default Nav;