const  Instructor = require("../models/instructorModel")

exports.createInstructor = async (req,res)=>{
    try{
        const instructor = new Instructor (req.body);
        await instructor.save();
        res.status(201).send({
            status:"success",
            message:"instructor created successfully"
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
};


exports.getAllInstructor = async(req,res)=>{
    try{
        const instructor = await Instructor.find();
        res.status(200).send({
            status:"success",
            count: instructor.length,
            data: instructor,
        });
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getOneInstructor = async (req,res)=>{
    try{
        const instructor = await Instructor.findById(req.params.instructorId);
        //if there is not instructor with the id supplied by the user return instructor not found
        if (!instructor){
            return res.status(404).send({
                status:"error",
                message:"instructor not found",
            });
        }
        //if the instructor  is found, return the instructor
        res.status(200).send({
            status:"success",
            data: instructor,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateOneInstructor = async (req,res) =>{
    try{
        const instructor = await Instructor.findByIdAndUpdate(req.params.instructorId,
            req.body,
            {new:true, runValidators:true}
        );
        // if there is not instructor with the id supplied by the user return instructor not found
      if(!instructor){
        return res.status(404).send({
            status:"success",
            message:"instructor not found",
        });
      }

      await instructor.save();
      res.status(200).send({
        status:"success",
        data: instructor,
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
        }
};
exports.deleteOneInstructor = async (req,res)=>{
    try{
        const instructor = await Instructor.findById(req.params.instructorId);
        // if there is not instructor with the id supplied by the user return instructor not found
        if(!instructor){
            return res.status(404).send({
                status:"error",
                message:"instrucor not found",
                });
        }
        //if the course  is found, return the course
        await instructor.remove();
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}