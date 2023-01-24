import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () =>{
    const [listState, setListState] = useState({
        loading: false,
        contacts: [],
        filterContact: [],
        errorMessage: ''
    });

    //search data
    // let [query, setQuery] = useState({
        // text: ''
    // })
    const [queryString, setQueryString] = useState('')
   
    useEffect(()=>{
        fetchData();
    }, [])

     //fetching data
     const fetchData = async () =>{
        try {
            setListState({...listState, loading: true });
            
            const res = await ContactService.getAllContact();
            
            setListState({
                ...listState,
                loading: false,
                contacts: res.data,
                filterContact: res.data
            })
           
        } catch(error) {
            setListState({...listState, loading: false, errorMessage: error.message })
        }
     }

     //delete a contact
     const clickDelete = async (id) =>{
        try {
            const res = await ContactService.deleteContact(id);
            
            // Limit API calls if possible, this will affect performance
            // When the code pass this point, the above API call should have been successful.
            // fetchData();
            
            newContacts = listState.contacts.filter(contact => contact._id === id);
            
            setListState({ ...listState, contacts: newContacts });
        } catch(error) {
            setListState({...listState, loading: false, errorMessage: error.message})
        }
     }

     //search contact
     const searchContact = (e) =>{
        setQueryString(e.target.value);
         
        const aContact = listState.contacts.filter(contact =>
            contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
         
        setListState({
            ...listState,
            filterContact: aContact
        })
     }


    const { loading, contacts, filterContact, errorMessage } = listState;

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
                                                value={queryString}
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
