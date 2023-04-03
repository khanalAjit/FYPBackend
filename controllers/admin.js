const User = require("../model/User");
const Profile = require("../model/Profile");
const Admin = require("../model/Admin");
const Adoption = require("../model/Adoptions");
const createAdmin = async (req, res) => {
  /* const ID = req.user.userId;
  const userFound = await Admin.findOne({ userID: ID });
  console.log(userFound);
  if (!userFound) {
    return res.status(404).json({ msg: `You are not an admin` });
  }
 */
  const adminUserId = req.body.userID;

  const userExists = await User.find({ _id: adminUserId });

  if (!userExists) {
    return res.status(400).json("The user doesn't exist");
  }

  if (userExists.role !== "caretaker") {
    return res.status(400).json("Only a caretaker can be promoted to admin");
  }
  const adminExists = await Admin.find({ userID: adminUserId });

  if (adminExists == null || adminExists.length == "0") {
    const admin = await Admin.create(req.body);
    return res
      .status(200)
      .json({ msg: `Admin created successfully. Details: ${admin}` });
  } else {
    return res.status(400).json("The user is already an admin");
  }
};

const getAdmins = async (req, res) => {
  /* const ID = req.user.userId;
  const userFound = await Admin.findOne({ userID: ID });
  console.log(userFound);
  if (!userFound) {
    return res.status(404).json({ msg: `fafwdadwaYou are not an admin` });
  }
 */
  const admins = await Admin.find({});
  return res.status(200).json({ admins });
};

const deleteUser = async (req, res) => {
  const update = { isDeleted: true };
  const identifiedUser = req.params.id;
  const userExists = await User.findOneAndUpdate(
    { _id: identifiedUser },
    update,
    { new: true, runValidators: true }
  );
  if (!userExists) {
    return res.status(404).json({ msg: "The user doesn't exist." });
  }
  return res
    .status(200)
    .json({ msg: `user ${identifiedUser} deleted successfully` });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ msg: "Error no users found" });
  }
  return res.status(200).json({ users });
};

const findUser = async (req, res) => {
  const id = req.body.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ msg: "Error: User not found of given id" });
  }
  return res.status(200).json({ user });
};

const getAllProfiles = async (req, res) => {
  const profiles = await Profile.find();
  if (!profiles) {
    return res.status(404).json({ msg: "Error no profiles found" });
  }
  return res.status(200).json({ profiles });
};

const findProfile = async (req, res) => {
  const id = req.body.profileId;
  const profile = await Profile.findOne({ _id: id });
  if (!profile) {
    return res
      .status(404)
      .json({ msg: "Error: profile not found of given id" });
  }
  return res.status(200).json({ profile });
};

const verifyProfile = async (req, res) => {
  const profileId = req.params.id;
  const userProfile = await Profile.findOne({ _id: profileId });

  if (!userProfile) {
    return res.status(400).json({ msg: "The profile doesn't exist" });
  }
  if (userProfile.verificationStatus === "verified") {
    return res.status(400).json({ msg: "The profile is already verified" });
  }
  const update = { verificationStatus: "verified" };
  const updatedProfile = await Profile.findOneAndUpdate(
    { _id: profileId },
    update,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({ updatedProfile });
};

const deleteProfile = async (req, res) => {
  const update = { isDeleted: true };
  const identifiedProfile = req.params.id;
  const profileExists = await Profile.findOneAndUpdate(
    {
      _id: identifiedProfile,
    },
    { update },
    { new: true, runValidators: true }
  );
  if (!profileExists) {
    return res.status(404).json({ msg: "The user doesn't exist." });
  }
  return res
    .status(200)
    .json({ msg: `Profile ${identifiedProfile} deleted successfully` });
};

const deleteAdoption = async (req, res) => {
  const update = { isDeleted: true };

  const identifiedAdoption = req.params.id;
  const postExists = await Adoption.findOneAndDelete(
    { _id: identifiedAdoption },
    { update },
    { new: true, runValidators: true }
  );
  if (!postExists) {
    return res.status(404).json({ msg: "The user doesn't exist." });
  }
  return res
    .status(200)
    .json({ msg: `ADoption post ${identifiedAdoption} deleted successfully` });
};

module.exports = {
  createAdmin,
  getAdmins,
  deleteUser,
  deleteProfile,
  deleteAdoption,
  getAllUsers,
  findUser,
  getAllProfiles,
  findProfile,
  verifyProfile,
};
