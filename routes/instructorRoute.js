//here we reuire our router from express
const {Router} = require("express");

// here we import and destructure our  function from the instructor controller
const {createInstructor, updateOneInstructor, getOneInstructor,getAllInstructor} = require("../controller/instructorController")

//here we give our router a variable name
const router = Router();

//here is our diffrent instructor routes
router.post("/instructor/create-instructor/:instructor", createInstructor);
router.put("/instructor/update-instructor/:instructorId", updateOneInstructor);
router.get("/instructor/get-instructor/:instructorId", getOneInstructor);
router.get("/instructor/get-instructors", getAllInstructor);




module.exports= router;