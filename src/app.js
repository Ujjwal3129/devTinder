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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // const userId = res.body.id;
      var token = jwt.sign({ _id: user._id }, "Ujjwal@123");

      res.cookie("token", token);
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
    res.status(400).send("Error", +err.message);
  }
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (userEmail.length === 0) {
      res.status(404).send("Not Found data");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body._Id;

  try {
    const user = await User.findOneAndDelete({ _Id: userId });

    res.status(200).send("Deleted succefully");
  } catch (err) {
    res.send("Something went wrong");
  }
});

//Update
app.patch("/update/:userId", async (req, res) => {
  const { userId, updateData } = req.body;

  try {
    const updatingFeild = ["firstName", "lastName", "skills", "age", "bio"];

    const isUpdatedAllowed = Object.keys(updateData).every((k) =>
      updatingFeild.includes(k)
    );

    if (!isUpdatedAllowed) {
      throw new Error("Updating is not allowed");
    }

    const updateUser = await User.findByIdAndUpdate(userId, updateData, {
      runValidators: true,
    });
    if (updateUser) {
      res.status(200).send("SuccessFully Upadted");
    } else {
      res.send("not found");
    }
  } catch (err) {
    res.status(400).send("Something went Wrong");
  }
});

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