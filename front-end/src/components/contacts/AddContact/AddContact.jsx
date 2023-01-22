import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';

let AddContact = () =>{

    let{id} = useParams();
    let navigate = useNavigate();
    let [name, setName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [image, setImage] = useState('');



    //add new contact
    let addData = async () =>{
        let contact = {name, phone, email, image}
        try{
            let res = await ContactService.addContact(contact);
            if(res){
                navigate('/contacts/list');
            }

        }catch(error){
            navigate('/contacts/add');
        }
     }

     //update contact

     useEffect (()=>{
        if(id){
            ContactService.getAContact(id)
                .then((res) =>{
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                    setImage(res.data.image);
                })
                .catch((err)=>{
                    navigate('/contacts/list');
                })
        }
     }, [])

     let update = async (id)=>{
        let contact = {name, phone, email, image}
        try{
            let res = await ContactService.updateContact(id, contact);
            if(res){
                navigate('/contacts/list');
            }

        }catch(error){
            navigate('/contacts/add');
        }
     }

     //form handler
     let submitForm = async (e)=>{
        e.preventDefault();
        // addData();
        if(id){
            update(id)
        }else{
            addData();
        } 
     }

     //change title
     let changeTitle = () =>{
        if(id){
            return <p className="h4 text-success fw-bold">Update Contact</p>
        }else{
            return <p className="h4 text-success fw-bold">Create Contact</p>
        }
     }
   
    return (
        <React.Fragment>
            <section className='add-contact p-3'>
                <div className=" container justify-content-center" >
                    <div className="row">
                        <div className="col">
                            {
                                changeTitle()
                            }        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input type='text' 
                                        className='form-control' 
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        required={true}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='number' className='form-control' placeholder='Phone'
                                        name='phone'
                                        value={phone}
                                        required={true}
                                        onChange={(e) => setPhone(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='email' className='form-control' placeholder='Email'
                                        name='email'
                                        value={email}
                                        required={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='text' className='form-control' placeholder='img'
                                        name='image'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='submit' className='btn btn-success' value="ADD"></input>
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

export default AddContact