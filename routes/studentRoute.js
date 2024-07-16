const {Router} = require("express");
const studentController = require("../controller/studentController");

const router = Router(); 


const getOneStudentMiddleware =(req,res,next)=> {
    console.log("this is a middleware that gets a single student");
    next();
};


router.post("/student",studentController.createStudent);
router.get("/student",studentController.getStudent);
router.get("/student/:studentId",getOneStudentMiddleware,studentController.getOneStudent);
router.put("/student/:studentId",studentController.updateOneStudent);
//router.put("/student/:studentId",studentController.updateOneStudent);
router.delete("/student/:studentId",studentController.deleteOneStudent);

module.exports = router;