import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';


const AddContact = () =>{

    const{id} = useParams();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "", 
        phone: "", 
        email: "", 
        image: ""
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };


    //add new contact
    const addData = async () =>{
        try{
            const res = await ContactService.addContact(inputs);
            if(res){
                navigate('/contacts/list');
            }

        }catch(error){
            navigate('/contacts/add');
        }
     }

     //update contact
     useEffect (() => {
        if (id) {
            ContactService.getContactById(id)
                .then ((res) => {
                    setInputs ({
                        ...inputs, ...res.data
                    })  
                })
                .catch ((err) => {
                    navigate('/contacts/list');
                })
        }
     }, [])

     const update = async (id) => {
        try {
            const res = await ContactService.updateContact(id, inputs );
            if(res){
                navigate('/contacts/list');
            }

        } catch (error) {
            navigate('/contacts/add');
        }
     }

     //form handler
     const submitForm = async (e) => {
        e.preventDefault();
        if (id) {
            update(id)
        } else {
            addData();
        } 
     }
   
    return (
        <React.Fragment>
            <section className='add-contact p-3'>
                <div className=" container justify-content-center" >
                    <div className="row">
                        <div className="col">
                           
                            <p className="h4 text-success fw-bold">
                                {!id ?  "Create Contact" : "Update Contact" }
                            </p>               
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
                                        value={inputs.name}
                                        required={true}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <input type='number' className='form-control' placeholder='Phone'
                                        name='phone'
                                        value={inputs.phone}
                                        required={true}
                                        onChange={handleChange}
                                    />
                                    
                                </div>
                                <div className="mb-2">
                                    <input type='email' className='form-control' placeholder='Email'
                                        name='email'
                                        value={inputs.email}
                                        required={true}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <input type='text' className='form-control' placeholder='img'
                                        name='image'
                                        value={inputs.image}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <input type='submit' className='btn btn-success' value="ADD"/>
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