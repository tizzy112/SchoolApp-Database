const mongoose = require("mongoose")



mongoose.connect(
    "mongodb+srv://oriyomiolamilekan22:cqXSL2qoC1X6amKz@cluster0.fz98ivq.mongodb.net/SchoolApp?retryWrites=true&w=majority&appName=Cluster0/SchoolApp"
  //  mongodb+srv://oriyomiolamilekan22:<password>@cluster0.fz98ivq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/
);
const db = mongoose.connection;


module.exports= db;

