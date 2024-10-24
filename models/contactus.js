import mongoose from 'mongoose';

const ContactUsSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v); // Validates 10 digit phone numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [500, 'Message cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

// Use a consistent model name; ensure it's not being redefined elsewhere
// const Blog = models.Blog || model('Blog', BlogSchema);

// export default Blog;

// export const Blog = models.Blog || model('Blog', BlogSchema);
const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', ContactUsSchema);

export default ContactUs;

