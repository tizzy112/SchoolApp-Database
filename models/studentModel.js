const mongoose = require("mongoose")

const {Schema} = mongoose;

const studentSchema = new Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name:{
    type: String,
    required : true,
    } ,
    other_name:{
        type: String,
        required : false,
        },
        
        email:{
            type: String,
            required:true,
            lowercase:true,         
        },
        phone:{
            type: String,
            required:true,
        },
        
        
        age:{
            type: Number,
            required:true,
            validate:(v)=> v > 18 && v  < 60,
        }
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;