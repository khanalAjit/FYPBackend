//loading .env files in process.env
require("dotenv").config();
//importing other required items
const connectDB = require("./database/connect");
const Admin = require("./model/Admin");
const jsonAdmins = require("./Admins.json");

//async function is used because we need to assure the database connection first. without it there is no point of this code.
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Admin.deleteMany(); //to delete the Admin created while testing.
    await Admin.create(jsonAdmins); //actually populating the database
    console.log("The addition was successful"); //to ensure the successful addition of Admin in database
    process.exit(0); //exiting the program successfully
  } catch (error) {
    console.log(error);
    process.exit(1); //exiting the program with error.
  }
};

start();
