require("dotenv").config();
const Profile = require("../model/Profile");
const Admins = require("../model/Admin");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

//create the profile of a caretaker

const createProfile = async (req, res) => {
  const userEmail = req.user.email;

  console.log(req.file);
  const userId = req.user.userId;

  const role = req.user.role;

  const profileEmail = req.body.email;

  if (role != "caretaker") {
    return res.status(400).json({ msg: "You are not a caretaker" });
  }

  if (userEmail != profileEmail) {
    return res.status(400).json({ msg: "Please use your registered email" });
  }

  const profileExists = await Profile.find({ profileOf: userId });
  if (!profileExists || profileExists == null || profileExists.length == "0") {
    const profile = await Profile.create({
      profileOf: userId,
      username: req.body.username,
      profileImageUrl: req.file.filename,
      email: req.body.email,
      name: req.body.name,
      bio: req.body.bio,
      speciality: req.body.speciality,
      rate: req.body.rate,
      contact: req.body.contact,
      location: req.body.location,
    });
    return res.status(200).json({ profile });
  } else {
    console.log(profileExists);
    return res.status(400).json({ msg: "Your Profile already Exists" });
  }
};

//get all profiles
//this is to view caretakers so it is available to everyone
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    return res.status(200).json({ profiles });
  } catch (e) {
    console.log(e);
  }
};

//to get a spicific id.
//the my profile section
const getMyProfile = async (req, res) => {
  const userId = req.user.userId;
  const profile = await Profile.findOne({ profileOf: userId });

  if (!profile) {
    return res.status(404).json({ msg: "You have not created your Profile" });
  } else {
    return res.status(200).json(profile);
  }
};

//to update the profile
const updateProfile = async (req, res) => {
  const requestor = req.user.userId;
  /* const {
    body: {
      username,
      profileImageUrl,
      bio,
      speciality,
      rate,
      contact,
      location,
    },
  } = req; */

  const updatedProfile = await Profile.findOneAndUpdate(
    { profileOf: requestor },
    {
      profileOf: userId,
      username: req.body.username,
      profileImageUrl: req.file.filename,
      email: req.body.email,
      name: req.body.name,
      bio: req.body.bio,
      speciality: req.body.speciality,
      rate: req.body.rate,
      contact: req.body.contact,
      location: req.body.location,
    },
    { new: true, runValidators: true }
  );
  if (!updateProfile) {
    return res
      .status(404)
      .json({ msg: "Some error occured while updating the data" });
  }
  res.status(200).json({ updatedProfile });
};

const applyForVerification = async (req, res) => {
  const applier = req.user.userId;
  const userProfile = await Profile.findOne({ profileOf: applier });

  /*   const fileContent = fs.readFileSync(
    path.join(__dirname, "../Profiles/1680242085460-logo.png")
  ); */

  if (!userProfile) {
    return res.status(400).json({ msg: "You haven't made a profile yet" });
  }
  if (userProfile.verificationStatus !== "unknown") {
    return res
      .status(400)
      .json({ msg: "You have already requested or are verified" });
  }

  adminEmails = [];
  const admins = await Admins.find();
  admins.forEach((admin) => {
    return adminEmails.push(admin.email);
  });

  let text = req.body.text;
  let attachments = [];
  for (let i = 0; i < req.files.length; i++) {
    let fileDetails = {
      filename: req.files[i].filename,
      path: req.files[i].path,
    };
    attachments.push(fileDetails);
  }
  console.log(attachments);

  const update = { verificationStatus: "pending" };

  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: adminEmails,
    subject: `About Profile Verification of ${applier}`,
    text: text,
    attachments: attachments /* [
      {
        filename: "image.png",
        //content: attachment,
        content: fileContent,
        //encoding: "base64", // this doesn't work.
      },
    ], */,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent :" + info.response);
    }
  });

  const updatedProfile = await Profile.findOneAndUpdate(
    { profileOf: applier },
    update,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({ updatedProfile });
};

module.exports = {
  createProfile,
  getAllProfiles,
  getMyProfile,
  updateProfile,
  applyForVerification,
};
