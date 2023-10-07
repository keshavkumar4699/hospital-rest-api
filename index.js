const express = require('express');
const app = express('express');

const port = 8000;



app.listen(port, (err)=>{
  if(err){
    console.log("error encountered in starting server ", err);
  }
  console.log("server started at port ", port);
});