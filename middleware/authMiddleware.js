//here we getting our jsonwebtoken to our file after installing it
const jwt = require("jsonwebtoken");

//we are importing our .env file
const dotenv = require("dotenv");
dotenv.config();

//here we are verifying our token 
exports.verifyToken = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token) return res.status(401).send("access denied");


    //here we are checking if the token enter does match the one we have in our SECRET_KEY which was in our .env file
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err) return res.status(403).send("invalid token");
        req.id = user.id;
        req.role = user.role;
        next();
    })
}
//here we are checking what role is the user checking if it was a student
exports.isStudent = (req,res,next)=>{
    if(req.role !== "student") return res.status(403).send("access denied");
    next();
}


//here we are checking what role is the user checking if it was a instructor

exports.isInstructor = (req,res,next)=>{
    if(req.role !== "instructor") return res.status(403).send("access denied");
    next();
}