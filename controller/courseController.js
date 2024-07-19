//here we try to import our course from the course module which is the structure
const  Course = require("../models/courseModel")


//here we try to create a course
exports.createCourse = async (req,res)=>{
    try{
        const course = new Course (req.body);
        await course.save();
        res.status(201).send({
            status:"success",
            message:"course created successfully"
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

//here we try to get a course
exports.getCourse = async(req,res)=>{
    try{
        const course = await Course.find();
        res.status(200).send({
            status:"success",
            count: course.length,
            data: course,
        });
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

// here we try to get one course 
exports.getOneCourse = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.courseId);
        //if there is not course with the id supplied by the user return course not found
        if (!course){
            return res.status(404).send({
                status:"error",
                message:"course not found",
            });
        }
        //if the course  is found, return the course
        res.status(200).send({
            status:"success",
            data: course,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

// here we try to update one course 
exports.updateOneCourse = async (req,res) =>{
    try{
        const course = await Course.findByIdAndUpdate(req.params.courseId,
            req.body,
            {new:true, runValidators:true}
        );
        // if there is not course with the id supplied by the user return course not found
      if(!course){
        return res.status(404).send({
            status:"success",
            message:"course not found",
        });
      }

      await course.save();
      res.status(200).send({
        status:"success",
        data: course,
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
        }
};

//here we try to delete a course
exports.deleteOneCourse = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.courseId);
        // if there is not course with the id supplied by the user return course not found
        if(!course){
            return res.status(404).send({
                status:"error",
                message:"course not found",
                });
        }
        //if the course  is found, return the course
        await course.remove();
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}