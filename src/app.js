const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const { connectDb } = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

const {userAuth }= require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());
app.post("/singup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added SuccessFully");
  } catch (err) {
    res.status(400).send("Error Saving the User:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("InValid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // const userId = res.body.id;
      
      const token =  await user.getJWT();

      res.cookie("token", token ,{
        expires: new Date(Date.now()+8*36000), 
      });
      res.send("Login Successfully");
    } else {
      throw new Error("InValid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error!! " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    

    const user = req.user;

    res.send(user);

   
  } catch (err) {
    res.status(400).send("Error ", +err.message);
  }
});

app.get("/ConnectionReq",userAuth, async (req,res)=>{
  const user = req.user;

  res.send(user.firstName+" Has Sent THe req");
  

  


})

// ================= CONNECT DB =================
connectDb()
  .then(() => {
    console.log("✅ Database Connection Established...");
    app.listen(6969, () => {
      console.log("🚀 Server running on port 6969");
    });
  })
  .catch((err) => {
    console.error("❌ Database not connected");
  });