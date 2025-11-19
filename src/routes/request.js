const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


// Connection Request ka Schema models/connectionRequest.js me hai
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId.trim();
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // Corner Case: id must exist in DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User Not Found!" });
      }

      // Connection Request ek bar send ho chuka ho to rokne ke liye
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Exists!!" });
      }

      // Connection Request create karne ke liye
      const request = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await request.save();

      return res.json({
        message:  req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });

    } catch (err) {
      return res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
