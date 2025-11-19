const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");


// Connect to MongoDB and Start   

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


// Connect to MongoDB and Start the Server
connectDB()
  .then(() => {
    console.log("✅ Database connection established...");
    app.listen(6969, () => {
      console.log("🚀 Server running on port 6969...");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed!", err);
  });
          // req.user.firstName + " is " + status + " in " + toUser.firstName,
