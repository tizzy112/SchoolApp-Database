//here we require mongoose to our module after installing it with npm
const mongoose = require("mongoose")

//here we import our .env file because we have our database link init which is MONGODB_CONNECTION_STRING
const dotenv = require("dotenv");
dotenv.config();


//here we try to connect to our mongodb using atlas
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING
  //  mongodb+srv://oriyomiolamilekan22:<password>@cluster0.fz98ivq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/
);

//here we give our data base connection into a variable
const db = mongoose.connection;

// here we are exporting our database
module.exports= db;

