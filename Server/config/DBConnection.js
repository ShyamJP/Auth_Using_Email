const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
.then(()=>console.log("DB Connected successfully..."))
.catch((err)=>console.log(err));