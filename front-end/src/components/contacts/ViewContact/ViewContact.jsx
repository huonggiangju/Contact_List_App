import React, { Component } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';



const ViewContact = () =>{

    const{ id } = useParams();
    const [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: ""
    })

    useEffect(()=>{
        getData();
    }, [])

    //get a single contact
    const getData = async () =>{
        
        try {
            setState({ ...state, loading: true });
            const res = await ContactService.getContactById(id);
            setState({
                ...state,
                loading: false,
                contact: res.data
            })
           
        } catch (error) {
            setState({ ...state, loading: false, errorMessage: error.message })
        }
     }

     const{ loading, contact, errorMessage } = state;

    return (
        <React.Fragment>
            <section className='view-contact-intro p-3'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="h3 text-warning fw-bold">View Contact</div>

                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : 
                <React.Fragment>
                    { Object.keys(contact).length >0 &&
            <section className='view-contact mt-3'>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={contact.image} alt='img' className='img-fluid contact-img'/>
                        </div>
                        <div className="col-md-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                    Name: <span className='fw-bold'>{contact.name}</span>
                                </li> 
                                <li className="list-group-item list-group-item-action">
                                    Mobile: <span className='fw-bold'>{contact.phone}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    Email: <span className='fw-bold'>{contact.email}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row m-3 align-items-center">
                        <div className="col">
                            <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                        </div>
                    </div>
                </div>

            </section>
                }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ViewContact