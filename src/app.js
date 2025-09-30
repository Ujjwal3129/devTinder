const express = require("express");
const {adminAuth,userAuth} = require("./middlewares/auth")

const app = express();

app.use("/admin",adminAuth);

app.get("/admin/data", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/delete", (req, res) => {
  res.send("All Data deleted");
});

  app.get("/user/data", adminAuth ,(req,res)=>{
   //  console.log(req.params);
    res.send("Helloo jii");
 });

app.listen(6969, () => {
  console.log("Sucessfully");
});
