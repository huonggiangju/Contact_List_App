import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { authActions } from '../../Hook/AuthAction';
import { UserService} from '../../services/UserService';
import { useDispatch } from 'react-redux';


let Auth = () =>{
    let navigate = useNavigate();
    // let dispath = useDispatch();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [isSignup, setIsSignup] = useState(false);

    //login
    let login = async () =>{
        let user = {email, password};
        try{
            let res = await UserService.login(user);
            if(res){
                navigate('/contacts/list');
            }
        }catch (error){
            console.log(error);
        }
    }

    //signup
    let signup = async () =>{
        let user = {email, password};
        try{
            let res = await UserService.signup(user)
            if(res){
                navigate('/auth');
            }
        }catch (error){
            console.log(error);
        }
    }

    //handleSubmit
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        if (isSignup) {
            signup()
            .then((data) => localStorage.setItem("userId", data.user._id))
            // .then(() => dispath(authActions.login()))
        } else {
          login()
            .then((data) => localStorage.setItem("userId", data.user._id))
            // .then(() => dispath(authActions.login()))
        }
      };

    return(
        <React.Fragment>
            <section className='add-contact p-3'>
                <div className=" container justify-content-center" >
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">
                                {isSignup ? "Signup" : "Login"}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form >
                            
                                <div className="mb-2">
                                    <input type='email' className='form-control' placeholder='Email'
                                        name='email'
                                        value={email}
                                        required={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='text' className='form-control' placeholder='Password'
                                        name='phone'
                                        value={password}
                                        required={true}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>

                                {isSignup && (
                                    <div className="mb-2">
                                    <input type='text' className='form-control' placeholder='Password'
                                        name='phone'
                                        value={password}
                                        required={true}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>
                                )}{""}
                                <div className="mb-2">
                                    <button type='submit' className='btn btn-success'
                                        onClick={() => setIsSignup(!isSignup)}>
                                         {isSignup ?  "Signup" : "Login"}
                                    </button>
                                    
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                                   
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </React.Fragment>
    )
}

export default Auth