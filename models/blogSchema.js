const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const likesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    comments: [commentsSchema],
    likes :[likesSchema]
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogsSchema);
module.exports = Blog;
