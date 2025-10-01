const mongoose =require('mongoose');



const connectDb = async ()=>{
    await mongoose.connect(
    "mongodb+srv://Ujjwal3129:xLX07sABlGS2pnZg@namastenode.52tkp6k.mongodb.net/devTinder"
    );
};


module.exports = {connectDb};