//here we require our router from express
const {Router} = require("express");

//// here we import and destructure our  function from the student controller
const studentController = require("../controller/studentController");


// here we give our router a varaiable name
const router = Router(); 


//this is a middleware that get one student
const getOneStudentMiddleware =(req,res,next)=> {
    console.log("this is a middleware that gets a single student");
    next();
};


//this is our student routes
router.post("/student",studentController.createStudent);
router.get("/student",studentController.getStudent);
router.get("/student/:studentId",getOneStudentMiddleware,studentController.getOneStudent);
router.put("/student/:studentId",studentController.updateOneStudent);
//router.put("/student/:studentId",studentController.updateOneStudent);
router.delete("/student/:studentId",studentController.deleteOneStudent);


//export our router
module.exports = router;