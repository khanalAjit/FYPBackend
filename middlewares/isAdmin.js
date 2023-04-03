const User = require("../model/User");
const Admin = require("../model/Admin");

const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;
  console.log(userId);

  const adminExists = await Admin.findOne({ userID: userId });
  console.log(adminExists);
  if (!adminExists || adminExists.length === 0) {
    return res.status(200).json({ msg: "You aren't admin" });
  }
  next();
};

module.exports = isAdmin;
