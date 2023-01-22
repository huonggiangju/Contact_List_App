import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

let ContactList = () =>{

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filterContact: [],
        errorMessage: ''
    });

    //search data
    let [query, setQuery] = useState({
        text: ''
    })
   
    useEffect(()=>{
        fetchData();
    }, [])

     //fetching data
     const fetchData = async () =>{
        try{
            setState({...state, loading: true});
            let res = await ContactService.getAllContact();
            setState({
                ...state,
                loading: false,
                contacts: res.data,
                filterContact: res.data
            })
           
        }catch(error){
            setState({...state, loading: false, errorMessage: error.message})
        }
     }

     //delete a contact
     let clickDelete = async (id) =>{
        try{
           
            let res = await ContactService.deleteContact(id);
            fetchData();

        }catch(error){
            setState({...state, loading: false, errorMessage: error.message})
        }
     }

     //search contact
     let searchContact = (e) =>{
        setQuery({ ...query, text : e.target.value});
        let aContact = state.contacts.filter(contact =>{
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setState({
            ...state,
            filterContact: aContact
        })
     }


    let{loading, contacts, filterContact, errorMessage} = state;

    return (
        <React.Fragment>
            <section className='contact-search p-3'>
                <div className='container'>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col'>
                                <p className='h3 fw-bold'>Contact Manager 
                                    <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                    <i className='fa fa-plus-circle me-2'/> New
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form className='row'>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input type='text' className='form-control' 
                                                placeholder='Search Name'
                                                name='text'
                                                value={query.text}
                                                onChange={searchContact}
                                            />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input type='submit' className='btn btn-outline-dark' value='Search'/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            {
                loading ? <Spinner/> : 
                <React.Fragment>
            <section className='contact-list'>
                <div className="container">
                    <div className="row">

                        {
                            filterContact.length > 0 &&
                            filterContact.map(contact =>(

                                <div className="col-md-6" key={contact._id}>
                                <div className="card my-2">
                                    <div className="card-body">
                                        <div className="row align-items-center d-flex justify-content-around">
                                            <div className="col-md-4">
                                                <img src={contact.image} alt='img' className='img-fluid contact-img'></img>
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
                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                <Link  to={`/contacts/view/${contact._id}`} className='btn btn-warning m-1'>
                                                    <i className='fa fa-eye'></i>
                                                </Link>
                                                <Link  to={`/contacts/edit/${contact._id}`} className='btn btn-primary m-1'>
                                                    <i className='fa fa-pen'></i>
                                                </Link>
                                                <Link  className='btn btn-danger m-1' onClick={() => clickDelete(contact._id)}>
                                                    <i className='fa fa-trash'></i>
                                                </Link>
                                            </div>
                                        </div>
                                        
                                    </div>
    
                                </div>
                            </div>
                            ))
                        }

                        
                    </div>
                </div>

            </section>
                </React.Fragment>
            }

            
        </React.Fragment>
    )
}

export default ContactList