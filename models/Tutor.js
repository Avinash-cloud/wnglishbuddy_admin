import mongoose from "mongoose";


const LanguageSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  proficiency: { type: String, trim: true },
});

const TutorCourseSchema = new mongoose.Schema({
  course: { type: String, trim: true },
  fee: { type: String, trim: true },
});

const EducationSchema = new mongoose.Schema({
  level: { type: String, trim: true },
  university: { type: String, trim: true },
  location: { type: String, trim: true },
  year: { type: String, trim: true },
  document: { type: String, trim: true }, // Adding document field
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  institute: { type: String, trim: true },
  upload: { type: String, trim: true }, // Updating field to `upload`
});

const ReviewSchema = new mongoose.Schema({
 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  userName: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const classSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  date: { type: String, trim: true, default: "" },
  timeFrom: { type: String, trim: true, default: "" },
  timeTo: { type: String, trim: true, default: "" },
  zoomLink: { type: String, trim: true, default: "" },
  zoomMeetingId: { type: String, trim: true, default: "" },
  zoomPassword: { type: String, trim: true, default: "" },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  course: { type: String, trim: true, default: "" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },  
},{
  timestamps: true
});

const GraduationSchema = new mongoose.Schema({
  universityName: { type: String, trim: true },
  location: { type: String, trim: true },
  completionYear: { type: String, trim: true },
});



const GroupSchema = new mongoose.Schema({
  _id: { type: String, trim: true },
  groupName: { type: String, trim: true },
  groupCourseName: { type: String, trim: true },
  noOfStudents: { type: String, trim: true },
  createdDate: { type: Date, trim: true },
});

const inquirySchema=new mongoose.Schema({
  _id: { type: String, trim: true },
  studentId: { type: String, trim: true },
  studentName: { type: String, trim: true },
  tutorId: { type: String, trim: true },
  tutorName: { type: String, trim: true },
  enquiryViewed: { type: Boolean, trim: true,default: false },
  paid: { type: Boolean, trim: true,default:false },
  accepted: { type: Boolean, trim: true,default:false },
  price:{type:String, trim: true,},
  courseName:{type:String, trim: true,},
  status:{type:String, trim: true, default:"pending",}
},{
  timestamps:true
})

const TutorSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  type: { type: String, trim: true, default: "tutor" },
  password: { type: String, trim: true, default: "" },
  imageUrl: { type: String, trim: true },
  gender: { type: String, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  specialty: [{ type: String }],
  location: { type: String, trim: true },
  likes: { type: String, trim: true },
  dislikes: { type: String, trim: true },
  followers: { type: String, trim: true },
  rating: { type: String, trim: true },
  reviewCount: { type: String, trim: true },
  experience: { type: String, trim: true },
  fees: { type: String, trim: true },
  address: { type: String, trim: true },
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  overview: { type: String, trim: true },
  aadhar: { type: String, trim: true },
  pan: { type: String, trim: true },
  tutorCourses: [TutorCourseSchema],
  languagesSpoken:[{ type: String }],
  education: [EducationSchema],
  certifications: [CertificationSchema],
  reviews: [ReviewSchema],
  students: {
    data: {
      total: { type: String, trim: true },
      datalist: [classSchema],
    },
  },
  inquiries:[inquirySchema],
  groups: {
    data: {
      total: { type: String, trim: true },
      datalist: [GroupSchema],
    },
  },
});

export default mongoose.models.Tutor || mongoose.model("Tutor", TutorSchema);
