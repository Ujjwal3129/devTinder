// const adminAuth = (req, res, next) => {
//    console.log("Admin working");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// }

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const userAuth = (req, res, next) => {
//    console.log("User working");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (!isAdminAuthorized) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// }

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if(!token){
      throw new Error("Token is Not Found");
    }

    const decodeObj = await jwt.verify(token, "Ujjwal@123");

    const { _id } = decodeObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User Is not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error"+err.message);
  }
};

module.exports = {  userAuth };
