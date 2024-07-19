//we are importing our instructor schema which is the structure from it model
const Instructor = require("../models/instructorModel")

//we are importing our student schema which is the structure from it model
const Student = require("../models/studentModel")

//we are getting bcrypt to our module after installing it with npm
const bcrypt = require("bcrypt")

//we are getting jsonwebtoken to our module after installing it with npm
const jwt = require("jsonwebtoken")

//here we are importing our .env file 
const dotenv = require("dotenv");
dotenv.config();

//here we are trying to create and account user which can be the student or instructor 
exports.createAccount = async (req,res)=>{

    // here we declare the account which help use know what kind of user we wanted to create
    const {account} = req.params;

    //here we are trying to get the password from the req body
    const {password} = req.body;
    console.log(password)

    //here we are trying to get our password and hash it with thr bcrypt.hash method and passing the salt  of 10 which can be also be .
    const hashedPassword = await bcrypt.hash(password,10)
    console.log(password,"password");
    console.log(hashedPassword,"hashedPassword");       
    req.body.password = hashedPassword;

    //if the account trying to be create was a student
    if (account === "student"){
   try{

    //we check if the user student trying to be created was already existing
    const isUserExist = await Student.findOne({email:req.body.email});
    if(isUserExist){
        return res.status(400).send({
            status:"error",
            message:"User already exist"
        })
    }
    //if no student before in our base then we are creating new student
    const student = new Student(req.body);
    await student.save();
    res.status(201).send({
        status: "success",
        message: "student created successfully",
    })
   } catch (error){
    res.status(400).json({message: error.message})
   }

   // here we trying to check if the account trying to be created was an instructor 
    } else if(account === "instructor"){
        try{
            //here we are trying to check if the instructor account was already existing in our database 
           const  isUserExist = await Instructor.findOne({email:req.body.email});
            if(isUserExist){
                return res.status(400).send({
                    status:"error",
                    message:"User already exist"
                })
            }

        // if not we trying to create a new instrutor
            const instructor = new Instructor(req.body);
            await instructor.save();
            res.status(201).send({
                status: "success",
                message: "instructor created successfully",
            })
           } catch (error){
            res.status(400).json({message: error.message})
           }
    }else{
        res.status(400).send({message:"invalid account type"})
    }

}
/*
exports.instructorloginAccount = async (req, res) =>{
const UserExist = await Instructor.findOne({email:req.body.email});

if(UserExist){
   const passwordMatch = await bcrypt.compare(req.body.password, UserExist.password);
   if(!passwordMatch){
     return res.status(400).json({message: "password did not match"});
   }

    const SECRET_KEY = "my_secret_key" ;  

   const token = jwt.sign(
    {username: UserExist.username,
    name: UserExist.name,
    email: UserExist.email,
    },
    SECRET_KEY,{
        expiresIn: "2h"
    }
   )
   return res.status(200).json({token})
}else {
    return res.status(400).json({message: "user not found"})
}


}
exports.studentloginAccount = async (req, res) =>{
    const UserExist = await Student.findOne({email:req.body.email});
    
    if(UserExist){
       const passwordMatch = await bcrypt.compare(req.body.password, UserExist.password);
       if(!passwordMatch){
         return res.status(400).json({message: "password did not match"});
       }
    
        const SECRET_KEY = "my_secret_key" ;  
    
       const token = jwt.sign(
        {username: UserExist.username,
        name: UserExist.name,
        email: UserExist.email,
        },
        SECRET_KEY,{
            expiresIn: "2h"
        }
       )
       return res.status(200).json({token})
    }else {
        return res.status(400).json({message: "user not found"})
    }
    
    
    } */


    //this is the user login code which is for both student and instructor login and exported to our auth route
    exports.userLogin = async (req,res)=>{
        try{

            //the account here was our param that comes with  the req body that could be eaither student or insturctor in this case
            const {account} = req.params;

            // this is our entry input which with be what our account user with use to login there account 
            const {email,password} = req.body;
            if(!email || !password ){
                return res.status(400).json({message: "please provide an email and password"})
            }

            // here we are checking if our user trying to sign in was a student and if its not 
            if(account === "student"){
                const student = await Student.findOne({email});
                if(!student){
                    return res.status(400).json({message: "student not found"})
                }

                // here was about if the input password exist or match the password with decoded with brypt by using the compare method here after installing with npm install
                const passwordMatch = await bcrypt.compare(password, student.password);
                if(!passwordMatch){
                    return res.status(400).json({
                        message: "password did not match"})
                }

                // creating token of our pass with the jsonwebtoken after we install it with npm install and require it at the top of our code 
                const token = jwt.sign(
                    {id: student._id, role:"student"},
                    process.env.SECRET_KEY,
                    {expiresIn: "1h"}
                )
                res.status(200).send({
                    status:"success",
                    data:{
                        token,
                        student:{
                            id: student._id,
                            name: student.name,
                            email: student.email,
                        }
                    }
                   })

               /*
                res.status(200).json({
                    status: "success",
                    message:"Instructor logged in successfully"
                }) */


                 
         // here we are checking if our user trying to sign in was a instuctor and if its not 

            }else if (account === "instructor"){
                const instructor = await Instructor.findOne({email});
                if(!instructor){
                    return res.status(400).json({message: "instructor not found"})
                }

            // here was about if the input password exist or match the password with decoded with brypt by using the compare method here after installing with npm install
                const passwordMatch = await bcrypt.compare(password, instructor.password);
                if(!passwordMatch){
                    return res.status(400).json({message: "password did not match"})
                }
                // creating token of our pass with the jsonwebtoken after we install it with npm install and require it at the top of our code 
                     const token = jwt.sign(
                      {id: instructor._id, role:"instructor"},
                      process.env.SECRET_KEY,
                     {expiresIn: "1h"}
                     )
                res.status(200).json({
                    status: "success",
                    data:{
                        token,
                        instructor:{
                            id: instructor._id,
                            name: instructor.name,
                            email: instructor.email,
                        }
                    }
                })
            }
            



        } catch(error){
            return res.status(500).json({message: error.message})

        }
    }

