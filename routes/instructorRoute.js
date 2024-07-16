const {Router} = require("express");

const {createInstructor, updateOneInstructor, getOneInstructor,getAllInstructor} = require("../controller/instructorController")


const router = Router();
router.post("/instructor/create-instructor/:instructor", createInstructor);
router.put("/instructor/update-instructor/:instructorId", updateOneInstructor);
router.get("/instructor/get-instructor/:instructorId", getOneInstructor);
router.get("/instructor/get-instructors", getAllInstructor);




module.exports= router;