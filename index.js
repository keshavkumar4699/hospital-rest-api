const express = require('express');
const app = express('express');
const db = require('./config/mongoose');
const dotenv = require('dotenv').config;
const port = process.env.PORT;

//to encode reponsedata in body of url when getting response
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setup express router
app.use('/', require('./routes/index_router.js'));

app.listen(port, (err)=>{
  if(err){
    console.log("error encountered in starting server ", err);
  }
  console.log("server started at port", port);
});