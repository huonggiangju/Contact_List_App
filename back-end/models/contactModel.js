const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema ({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    image: { type: String }
}, { timestamps : true })

module.exports = mongoose.model('Contact', contactSchema)
