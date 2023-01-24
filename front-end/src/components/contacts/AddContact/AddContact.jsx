import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../../services/ContactService';

const AddContact = () =>{
    const { id } = useParams();
    const navigate = useNavigate();
    // const [name, setName] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [image, setImage] = useState('');
    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        email: '',
        image: ''
    });

    //add new contact
    const addData = async () =>{
        // const contact = { name, phone, email, image }
        try {
            const res = await ContactService.addContact(contactInfo);
            if (res) {
                navigate('/contacts/list');
            }

        } catch(error) {
            navigate('/contacts/add');
        }
     }

     //update contact
     useEffect(()=>{
        if (id) {
            ContactService.getAContact(id)
                .then((res) => {
                    // setName(res.data.name);
                    // setEmail(res.data.email);
                    // setPhone(res.data.phone);
                    // setImage(res.data.image);
                    setContactInfo({ ...contactInfo, ...res.data });
                })
                .catch((err)=>{
                    navigate('/contacts/list');
                });
        }
     }, [])

     const update = async (id) => {
        // const contact = { name, phone, email, image }
        try {
            const res = await ContactService.updateContact(id, contactInfo);
            
            if (res) {
                navigate('/contacts/list');
            }
        } catch(error) {
            navigate('/contacts/add');
        }
     }
     
     const onChangeHandler = (e) => {
         setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
     }

     //form handler
     const submitForm = async (e) => {
        e.preventDefault();
        // addData();
        if (id) {
            update(id);
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
                                {!!id ? "Update" : "Create" } Contact
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
                                        value={name}
                                        required={true}
                                        onChange={onChangeHandler}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='number' className='form-control' placeholder='Phone'
                                        name='phone'
                                        value={phone}
                                        required={true}
                                        onChange={onChangeHandler}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='email' className='form-control' placeholder='Email'
                                        name='email'
                                        value={email}
                                        required={true}
                                        onChange={onChangeHandler}
                                    ></input>
                                </div>
                                <div className="mb-2">
                                    <input type='text' className='form-control' placeholder='img'
                                        name='image'
                                        value={image}
                                        onChange={onChangeHandler}
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
