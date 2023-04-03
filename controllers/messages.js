const Profile = require("../model/Profile");
const Admin = require("../model/Admin");
const Message = require("../model/Messages");

const sendMessage = async (req, res) => {
  const sender = req.user.userId;
  const receiver = req.params.id;

  const receiverExists = await Profile.find({ _id: receiver });
  if (!receiverExists) {
    return res.status(404).json({ msg: "The profile does not exist" });
  }
  const message = await Message.create({
    from: sender,
    to: receiver,
    message: req.body.message,
    email: req.body.email,
  });
  return res.status(200).json({ message });
};

const myMessagesHistory = async (req, res) => {
  const historyOf = req.user.userId;
  const profileOf = await Profile.findOne({ profileOf: historyOf });
  if (!profileOf) {
    return res.status(400).json({ msg: `Error, profile not found` });
  }
  const messageOf = profileOf._id;

  const history = await Message.find({ to: messageOf });

  if (!history || history.length === 0) {
    return res
      .status(404)
      .json({ msg: "You have not sent or received any requests yet" });
  }
  return res.status(200).json({ history });
};

const getAllMessages = async (req, res) => {
  const requestor = req.user.userId;
  const isAdmin = await Admin.find({ userID: requestor });
  if (!isAdmin || isAdmin.length === 0) {
    return res.status(404).json({ msg: "You are not an admin" });
  } else {
    const history = await Message.find();
    if (!history || history.length === 0) {
      return res.status(404).json({ msg: "No messages has been sent yet" });
    }
    return res.status(200).json({ history });
  }
};
module.exports = { sendMessage, myMessagesHistory, getAllMessages };
