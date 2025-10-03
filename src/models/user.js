const mongoose= require('mongoose');


 const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required : true,
        minLength : 4,
    },
    lastName:{
         type:String,
         required : true,

    },
    emailId:{
         type:String,
         required : true,
         lowercase : true,
         unique: true,
         trim: true,
    },
    password:{
         type:String,
         required : true,

    },
   age:{
   type:Number,
   min:18, 
//    validate(value){
//      if(value<18){
//           throw new Error("You are not Elebible");
//      }
//    }
   
         
    },
    gender:{
         type:String,
         validate(value){
      if(!["male","female","others"].includes(value)){
         throw new console.error("Gender data is not valid");
      }
         }
    },
    skills:{
     type:String,
    },
    bio:{
     type:String,
     default:"This is deafault bio",
    },
   
}, { timestamps: true })



module.exports = mongoose.model("user",userSchema);