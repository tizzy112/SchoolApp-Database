const mongoose = require("mongoose");
const Instructor = require("./instructorModel");

const {Schema} = mongoose;

const courseSchema = new Schema({
    course_name : {
        type : String,
        required : true,
    },

    price:{
    type: Number,
    required : true,
    } ,
  instructor:{

  },
    duration:{
        type: String,
        required : false,
        },
        students:{
            type:[mongoose.Schema.Types.ObjectId],
            default:[],
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        
        requirement:{
            type: [String],
            required:true,
        },
        discription:{
            type: String,
            required:true,
        },
        course:{
            type:[mongoose.Schema.Types.ObjectId]
        },
        password:{
            type:String,
            required:true,
            validate: (v) => v.length > 6,
        },




});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;