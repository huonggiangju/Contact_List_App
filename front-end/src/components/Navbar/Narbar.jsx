import React, { Component } from 'react'
import {Link} from 'react-router-dom';

let Navbar = () =>{
    return (
        <React.Fragment>
            <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
                <div className='container'>
                    <Link to={"/"} className="navbar-brand">
                        <i className='fa fa-mobile text-warning'/> Contact 
                        <span className='text-warning'> Manager</span>
                    </Link>
                </div>
                <div class="navbar-nav">
                    <Link to={"/auth"} className="navbar-brand">Login</Link>
                    <Link to={"/auth"} className="navbar-brand">Signup</Link>
                    <Link to={"/auth"} className="navbar-brand">Logout</Link>
                    
                </div>

            </nav>
        </React.Fragment>
    )
}

export default Navbar