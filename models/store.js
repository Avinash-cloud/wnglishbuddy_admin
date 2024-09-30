import mongoose from 'mongoose';

// Create a schema for the Book model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true
    },
    publicationYear: {
        type: Number,
        required: true,
        min: 1800, // Example validation for reasonable publication years
        max: new Date().getFullYear() // Current year
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        // required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    keywords: {
        type: [String], // Array of strings
        default: []
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
    format: {
        type: String,
        required: true,
        trim: true
    },
    numberOfPages: {
        type: Number,
        required: true,
        min: 1 // Minimum of 1 page
    },
    dimensions: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Price cannot be negative
    },
    discount: {
        type: Number,
        required:true,// Assuming discount is a percentage
    },
    quantity: {
        type: Number,
        required: true,
        min: 0 // Cannot have negative quantity
    },
    minimumOrderQuantity: {
        type: Number,
         // Minimum order quantity must be at least 1
    },
    shippingOptions: {
        type: String,
        trim: true
    },
    shippingCosts: {
        type: String,
        trim: true
    },
    deliveryTimes: {
        type: String,
        trim: true
    },
    tax: {
        type: String,
        trim: true
    },
    bookCoverImage: {
        type: String, // Assuming this is a URL or file path
    },
    additionalImages: {
        type: [String], // Array of image URLs or file paths
        default: []
    },
   images: {
        type: [String], // Array of image URLs or file paths
        default: []
    },
    videoLink: {
        type: String,
        trim: true
    },
    metaTitle: {
        type: String,
        trim: true
    },
    metaDescription: {
        type: String,
        trim: true
    },
    metaKeywords: {
        type: [String], // Array of meta keywords
        default: []
    }
}, { timestamps: true });

// Create the Book model from the schema
const Store = mongoose.models.stores || mongoose.model('stores', bookSchema);

export default Store;
