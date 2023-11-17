const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5500;

//cors
app.use(cors());


//import routes 
const TodoItemRoute = require('./routes/todoItems');



mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("DB connected"))
.catch(err => console.log(err))

app.use('/', TodoItemRoute);


app.listen(PORT, ()=> console.log("server connected"));