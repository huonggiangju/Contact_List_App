const express = require('express')
const dotenv = require('dotenv');
const  mongoose  = require('mongoose');
dotenv.config()
const contactRoutes = require('./routes/contact')


const app = express();

const PORT = process.env.PORT;
const URL = process.env.URL

//middelware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

mongoose.set('strictQuery', false);
//connect DB
mongoose
    .connect(process.env.URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //listen port
        app.listen(process.env.PORT, ()=>{
            console.log(`listen port ${PORT}`)
        })
        console.log("Connected DB")
    })
    
    .catch((err) =>console.log(err))

//routes
app.use('/v1/contact/', contactRoutes)


