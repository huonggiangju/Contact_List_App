const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},

}, {timestamps : true})

//********SIGNUP method
userSchema.statics.signup = async function(email, password){
    // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  //check exists user
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  //hashing password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

//********LOGIN method
userSchema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    
    //check user
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

      //check password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema )