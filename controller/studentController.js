const Student =require("../models/studentModel")

exports.createStudent = async (req,res) =>{
    try{
        const student = new Student (req.body);
        await student.save();
        res.status(201).send({
            status:"success",
            message:"student created successfully"
        });
    }catch (error){
        res.status(400).json({message:error.message});
    }
};

exports.getStudent = async(req,res)=>{
    try{
        const students = await Student.find();
        res.status(200).send({
            status:"success",
            count: students.length,
            data: students,
        });
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getOneStudent = async (req,res)=>{
    try{
        const student = await Student.findById(req.params.studentId);
        //if there is not student with the id supplied by the user return student not found
        if (!student){
            return res.status(404).send({
                status:"error",
                message:"student not found",
            });
        }
        //if the student  is found, return the student
        res.status(200).send({
            status:"success",
            data: student,
        })
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateOneStudent = async (req,res) =>{
    try{
      //  const {first_name,last_name,age,other_name,phone,email} = req.body;
        const student = await Student.findByIdAndUpdate(req.params.studentId,
            req.body,
            {new:true, runValidators:true}
        );
        // if there is not student with the id supplied by the user return student not found
      if(!student){
        return res.status(404).send({
            status:"success",
            message:"student not found",
        });
      }
    //   //if the student  is found, return the student
    //   student.first_name = first_name;
    //   student.last_name = last_name;
    //   student.age = age;
    //   student.other_name = other_name;
    //   student.phone = phone;
    //   student.email = email;
    // student.updateOne(
    //    { $set:{first_name,last_name,age,other_name,phone,email}}
    //)
      await student.save();
      res.status(200).send({
        status:"success",
        data: student,
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
        }
};
exports.deleteOneStudent = async (req,res)=>{
    try{
        const student = await Student.findById(req.params.studentId);
        // if there is not student with the id supplied by the user return student not found
        if(!student){
            return res.status(404).send({
                status:"error",
                message:"student not found",
                });
        }
        //if the student  is found, return the student
        await student.remove();
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}