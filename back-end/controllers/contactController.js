const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

//get all contact
const getAllContact = async (req, res) =>{
    const contacts = await Contact.find({}).sort({createAt: -1})

    res.status(200).json(contacts)
}

//get a signle contact
const getContact = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such contact"})
    }

    const contact = await Contact.findById(id);

    if(!contact){
        return res.status(404).json({error: 'No such contact'})
    }
    res.status(200).json(contact)
}

//create a contact
const createContact = async (req, res) =>{
    const {name, phone, email, image} = req.body;
    try{
        const contact = await Contact.create({name, phone, email, image})
        res.status(200).json(contact)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete workout
const deleteContact = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such contact"})
    }
    const contact = await Contact.findOneAndDelete({_id: id})

    if(!contact){
        return res.status(404).json({error: 'No such contact'})
    }
    res.status(200).json(contact)
}

//update workout
const updateContact = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no such contact"})
    }

    const contact = await Contact.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!contact){
        return res.status(404).json({error: 'No such contact'})
    }
    res.status(200).json(contact)
}


module.exports = {
    createContact, getAllContact, getContact, deleteContact, updateContact
}