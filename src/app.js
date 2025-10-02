const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

const {connectDb} = require("./config/database");
const User = require("./models/user");

app.use(express.json());
app.post("/singup",async (req,res)=>{

   // console.log(req.body);
   const user = new User(req.body);

   try{
      await user.save();
   res.send("User Added SuccessFully");
   }
   catch(err){
      res.status(400).send("Error Saving the User:"+err.message);
   }
   
});



connectDb()
  .then(() => {
    console.log("DataBase Connection Established...");
    app.listen(6969, () => {
      console.log("Sucessfully listenin on port 6969");
    });
  })
  .catch((err) => {
    console.error("Nott connected ");
  });
