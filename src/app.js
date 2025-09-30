 const express = require('express');

 const app = express();

  app.use("/test",(req,res)=>{
    res.send("Hello Form the test");
 });
 app.use("/",(req,res)=>{
    res.send("Hello Form the daseboard");
 });

 app.listen(6969, ()=>{
    console.log("Sucessfully");
 });