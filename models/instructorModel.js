const mongoose = require("mongoose")

const {Schema} = mongoose;

const instructorSchema = new Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name:{
    type: String,
    required : true,
    } ,
    course:{
        type: [mongoose.Schema.Types.ObjectId],
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
        gitHub:{
            type: String,
            required:true,
        },
        username:{
            type: String,
            required:true,
        },
        role:{
            type: String,
            default: "instructor",
        },
        /*
        gender:{
            type: mongoose.Schema.Types.ObjectId,
            required:false,
        }, */
        password:{
        type: String,
        required:true,
        },
        age:{
            type: Number,
            required:true,
            validate:(v)=> v > 18 && v  < 60,
        }

})

const Instructor = mongoose.model("instructor", instructorSchema);
module.exports = Instructor;