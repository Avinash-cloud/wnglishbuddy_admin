import mongoose from 'mongoose';

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


const inquirySchema = new mongoose.Schema({
  _id: { type: String, trim: true },
  studentId: { type: String, trim: true },
  tutorId: { type: String, trim: true },
  enquiryViewed: { type: Boolean, trim: true, default: false },
  paid: { type: Boolean, trim: true, default: false },
  accepted: { type: Boolean, trim: true, default: false },
  price: { type: String, trim: true, },
  courseName: { type: String, trim: true, },
  status: { type: String, trim: true, default: "pending", }
}, {
  timestamps: true
})


const studentSchema = new mongoose.Schema({
  studentMemberId: { type: Number, trim: true, default: null },
  dateJoined: { type: String, trim: true, default: "" },
  name: { type: String, trim: true, default: "" },
  type: { type: String, trim: true, default: "student" },
  imageUrl: { type: String, trim: true, default: "" },
  gender: { type: String, trim: true, default: "" },
  email: { type: String, trim: true, default: "", unique: true },
  phoneNumber: { type: String, trim: true, default: "" },
  location: { type: String, trim: true, default: "" },
  courseName: { type: [String], trim: true, default: [] },
  fullAddress: { type: String, trim: true, default: "" },
  address: { type: String, trim: true, default: "" },
  country: { type: String, trim: true, default: "" },
  city: { type: String, trim: true, default: "" },
  state: { type: String, trim: true, default: "" },
  pincode: { type: String, trim: true, default: "" },
  graduation: {
    universityName: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    completionYear: { type: String, trim: true, default: "" },
  },
  postGraduation: {
    universityName: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    completionYear: { type: String, trim: true, default: "" },
  },
  batchName: { type: String, trim: true, default: "" },
  paid: { type: Boolean, trim: true, default: false },
  upcomingClasses: { type: [classSchema], trim: true, default: [] },
  pastClasses: { type: [classSchema], trim: true, default: [] },
  startPlan: { type: String, trim: true, default: "" },
  courseName: { type: [String], trim: true, default: [] },
  password: { type: String, trim: true, default: "" },
  inquiries: [inquirySchema],
}, {
  timestamps: true,

});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
