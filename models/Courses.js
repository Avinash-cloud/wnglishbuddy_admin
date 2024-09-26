import mongoose from "mongoose";


const CourseSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    teacher: {
        type: String,
        required: true,
        trim:true,

    },
    image: {
        type: String,
        // required: true,
        trim:true,

    },
    price: {
        type: Number,
        required: true,
        trim:true,
       
    },
    students_no: {
        type: Number,
        trim:true,
        
    },
},{
    timestamps:true
});


const Courses = mongoose.models.Courses || mongoose.model('Courses', CourseSchema);

export default Courses;