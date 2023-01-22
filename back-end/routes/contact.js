const express = require('express')
const Contact = require('../models/contactModel')
const {createContact, getAllContact, getContact, deleteContact, updateContact} = require('../controllers/contactController')

const router = express.Router()

//get all contact
router.get('/', getAllContact)

//get a single contact
router.get('/:id', getContact)


//create new contact
router.post('/', createContact)

//delete contact
router.delete('/:id', deleteContact)

//update contact
router.patch('/:id', updateContact)

module.exports = router