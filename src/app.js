const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth")

const app = express();



app.get("/getUserData",(req,res)=>{
   try{
       throw new error("asdfjasjd");
   res.send("User data sent")
   }
   catch{
      res.send("Wrong wrong")
   }
  
});

app.use("/",(err,req,res,next)=>{
   res.status(500).send("Something went wrong");
});


app.listen(6969, () => {
  console.log("Sucessfully");
});
