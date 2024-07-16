const {Router} = require("express");

const {createCourse, getCourse, getOneCourse, updateOneCourse, deleteOneCourse} = require("../controller/courseController")


const router = Router();
router.post("/course/create-course/:course", createCourse);
router.get("/course/create-course", getCourse);
router.get("/course/create-course/:course", getOneCourse);
router.put("/course/create-course/:course", updateOneCourse);
router.delete("/course/create-course/:course", deleteOneCourse);




module.exports= router;