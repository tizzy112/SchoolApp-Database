//here we reruire of router from express
const {Router} = require("express");

// here we import and destructure our  function from the course controller
const {createCourse, getCourse, getOneCourse, updateOneCourse, deleteOneCourse} = require("../controller/courseController")

//we give our Route() a variable name
const router = Router();

//here are our diffrent course routes
router.post("/course/create-course/:course", createCourse);
router.get("/course/create-course", getCourse);
router.get("/course/create-course/:course", getOneCourse);
router.put("/course/create-course/:course", updateOneCourse);
router.delete("/course/create-course/:course", deleteOneCourse);



// we export our router
module.exports= router;