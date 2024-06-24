const express = require('express')
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./config/DBConnection');
const PORT = process.env.PORT | 3001;
const cors = require('cors')
const userRoutes = require('./routes/user.routers')

app.use(express.json({extended:true}))
app.use(cors())

app.use('/user',userRoutes)

app.listen(PORT, ()=>{
    console.log(`server is running on Port ${PORT}`);
})