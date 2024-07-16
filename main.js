//import express inti our application the es5 way
const express = require ("express");
const db = require("./DBcon/conn");
const studentRoute = require("./routes/studentRoute")
const authRoute = require("./routes/authRoute");
const Instructor = require("./models/instructorModel");
const instructorRoute = require("./routes/instructorRoute")
const courseRoute = require("./routes/courseRoute")

const app = express();

const PORT = 3002;

//using this middleware to process requeste from consumer
app.use(express.json());

const welcomeMessage= (req, res, next)=>{
    console.log("welcome to our school app")
  //this is used to move to the next middleware

  next();

};
const thankYou = (req,res,next) =>{
    console.log("thank you for using our app goodbye")
    next();
}


// this execute for every route on this server

app.use(welcomeMessage)


//importing the student route
app.use("/api/v1",authRoute)
app.use("/api/v1/", courseRoute)
app.use("/api/v1/", instructorRoute)
app.use("/api/v1",studentRoute)

app.use(thankYou)

//connecting to our  database 
db.on("error", (error)=>console.log(error));
db.once("open",()=>console.log("Connected to Database"));



//our port
app.listen(PORT,() =>{
    console.log(`app listening on http://localhost:${PORT}`)    
});

/*

app.get("/",(req ,res)=>{
    res.send("Hello World")
})

app.get("/about",(req,res)=>{
    res.send("About Page")      
})


app.post("/about", (req,res)=>{
    console.log(req.body)
    res.send("God is good")
    console.log("God is good")
})
    */


app.use("/api/v1",studentRoute);