const express = require('express');
const router = express.Router();
const Blogs = require("../models/blogSchema"); 


router.post("/newBlog", async (req, res) => {
    try {
        const { formData } = req.body;
        
        // Create a new blog instance with the formData
        const newBlog = new Blogs(formData);

        // Save the new blog to the database
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.error("Error creating new blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/allBlogs", async (req, res) => {
    try {
        const allBlogs = await Blogs.find();
        res.status(200).json(allBlogs);
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const blog = await Blogs.findById(id)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post("/:id", async (req, res) => {
    const id = req.params.id; 
    const { comment, userId, name } = req.body; 

    try {
        const blog = await Blogs.findById(id);
        console.log(blog)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        blog.comments.push({ userId, name, comment });
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error adding comment to blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/myBlogs/:email", async (req, res) => {
    const email = req.params.email
    console.log(email)
    try {
        const blogs = await Blogs.find({ userEmail: email });   
        if (blogs.length === 0) {
            return res.status(404).json({ message: 'Blogs not found for the specified email' });
        }
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs by email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
