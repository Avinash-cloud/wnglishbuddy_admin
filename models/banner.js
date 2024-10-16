import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true,        
    },
}, {
    timestamps: true
});

// Use a consistent model name; ensure it's not being redefined elsewhere
// const Blog = models.Blog || model('Blog', BlogSchema);

// export default Blog;

// export const Blog = models.Blog || model('Blog', BlogSchema);
const Banner = mongoose.models.banner || mongoose.model('banner', BannerSchema);

export default Banner;
