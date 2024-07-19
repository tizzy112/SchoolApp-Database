//import express inti our application the es5 way
const express = require ("express");

//importing our db from mongodb
const db = require("./DBcon/conn");

//importing all  our routes to our main js app 
const studentRoute = require("./routes/studentRoute")
const authRoute = require("./routes/authRoute");
const instructorRoute = require("./routes/instructorRoute")
const courseRoute = require("./routes/courseRoute")


//importing our middleware that verify token
const {
    verifyToken, isStudent, isInstructor
} = require("./middleware/authMiddleware")


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


//importing our diffrent route in our main js 

//this is for our authRoute
app.use("/api/v1",authRoute)

//our routes that works for course
app.use("/api/v1/", courseRoute)


//our routes that work for the instructor login and instrutor routes and it verify the login token
app.use("/api/v1/",verifyToken,isInstructor, instructorRoute)

//our routes that work for the instructor login and instrutor routes and it verify the login token
app.use("/api/v1",verifyToken,isStudent,studentRoute)

//this was for every log into our app after logging
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
