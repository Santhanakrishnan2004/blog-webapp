const express = require('express');
const Blog = require('../models/Blog');
const Review = require('../models/Review');
const router = express.Router();

router.post('/:blogId', async (req, res) => {
    const { content } = req.body;
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
        return res.redirect('/');
    }
    const review = new Review({ content, author: req.user._id, blog: blog._id });
    await review.save();
    blog.reviews.push(review);
    await blog.save();
    res.redirect(`/blogs/${blog._id}`);
});

module.exports = router;
