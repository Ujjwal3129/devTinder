const mongoose = require("mongoose");

var validator = require("validator");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Incoorect Email id" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Inavlid Url");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      //    validate(value){
      //      if(value<18){
      //           throw new Error("You are not Elebible");
      //      }
      //    }
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new console.error("Gender data is not valid");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 5) {
          throw new Error("You can pass min 5 skills");
        }
      },
    },
    bio: {
      type: String,
      default: "This is deafault bio",
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?size=626&ext=jpg",

      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Inavlid Url");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  var token = await jwt.sign({ _id: user._id }, "Ujjwal@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  

  return isPasswordValid;
};

module.exports = mongoose.model("user", userSchema);
