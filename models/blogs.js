import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    cardImage: {
        type: String
    },
}, {
    timestamps: true
});

// Use a consistent model name; ensure it's not being redefined elsewhere
// const Blog = models.Blog || model('Blog', BlogSchema);

// export default Blog;

// export const Blog = models.Blog || model('Blog', BlogSchema);
const Blog = mongoose.models.blogs || mongoose.model('blogs', BlogSchema);

export default Blog;

