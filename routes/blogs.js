// // // // // const express = require('express');
// // // // // const Blog = require('../models/Blog');
// // // // // const router = express.Router();

// // // // // router.get('/', async (req, res) => {
// // // // //     const blogs = await Blog.find().populate('author').exec();
// // // // //     res.render('blogs', { blogs });
// // // // // });

// // // // // router.get('/new', (req, res) => {
// // // // //     res.render('new-blog');
// // // // // });

// // // // // router.post('/', async (req, res) => {
// // // // //     const { title, content } = req.body;
// // // // //     const blog = new Blog({ title, content, author: req.user._id });
// // // // //     await blog.save();
// // // // //     res.redirect('/blogs');
// // // // // });

// // // // // router.get('/:id', async (req, res) => {
// // // // //     const blog = await Blog.findById(req.params.id).populate('author').populate({
// // // // //         path: 'reviews',
// // // // //         populate: { path: 'author' }
// // // // //     }).exec();
// // // // //     res.render('blog', { blog });
// // // // // });

// // // // // module.exports = router;
// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const Blog = require('../models/Blog');
// // // // const { ensureAuthenticated } = require('../config/auth');

// // // // // Route to create a new blog (form)
// // // // router.get('/new', ensureAuthenticated, (req, res) => {
// // // //     res.render('new-blog');
// // // // });

// // // // // Route to post a new blog
// // // // router.post('/new', ensureAuthenticated, async (req, res) => {
// // // //     try {
// // // //         const { title, content } = req.body;
// // // //         const newBlog = new Blog({
// // // //             title,
// // // //             content,
// // // //             author: req.user._id
// // // //         });
// // // //         await newBlog.save();
// // // //         res.redirect('/blogs');
// // // //     } catch (err) {
// // // //         console.error(err);
// // // //         res.status(500).send('Server Error');
// // // //     }
// // // // });

// // // // // Additional routes for viewing blogs, etc. can be added here

// // // // module.exports = router;
// // // const express = require('express');
// // // const router = express.Router();
// // // const Blog = require('../models/Blog');
// // // const { ensureAuthenticated } = require('../config/auth');

// // // // Route to create a new blog (form)
// // // router.get('/new', ensureAuthenticated, (req, res) => {
// // //     res.render('new-blog');
// // // });

// // // // Route to post a new blog
// // // router.post('/new', ensureAuthenticated, async (req, res) => {
// // //     try {
// // //         const { title, content } = req.body;
// // //         const newBlog = new Blog({
// // //             title,
// // //             content,
// // //             author: req.user._id
// // //         });
// // //         await newBlog.save();
// // //         res.redirect('/blogs');
// // //     } catch (err) {
// // //         console.error(err);
// // //         res.status(500).send('Server Error');
// // //     }
// // // });

// // // // Route to get a specific blog by ID
// // // router.get('/:id', async (req, res) => {
// // //     try {
// // //         const blog = await Blog.findById(req.params.id).populate('author');
// // //         res.render('blog', { blog });
// // //     } catch (err) {
// // //         console.error(err);
// // //         res.status(500).send('Server Error');
// // //     }
// // // });

// // // // Route to get all blogs
// // // router.get('/', async (req, res) => {
// // //     try {
// // //         const blogs = await Blog.find().populate('author');
// // //         res.render('blogs', { blogs });
// // //     } catch (err) {
// // //         console.error(err);
// // //         res.status(500).send('Server Error');
// // //     }
// // // });

// // // module.exports = router;
// // const express = require('express');
// // const router = express.Router();
// // const Blog = require('../models/Blog');
// // const { ensureAuthenticated } = require('../config/auth');

// // // Route to create a new blog (form)
// // router.get('/new', ensureAuthenticated, (req, res) => {
// //     res.render('new-blog');
// // });

// // // Route to post a new blog
// // router.post('/new', ensureAuthenticated, async (req, res) => {
// //     try {
// //         const { title, content } = req.body;
// //         const newBlog = new Blog({
// //             title,
// //             content,
// //             author: req.user._id
// //         });
// //         await newBlog.save();
// //         res.redirect('/blogs');
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // // Route to get a specific blog by ID
// // router.get('/:id', async (req, res) => {
// //     try {
// //         const blog = await Blog.findById(req.params.id).populate('author');
// //         res.render('blog', { blog });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // //
// // // Route to get all blogs
// // router.get('/', async (req, res) => {
// //     try {
// //         const blogs = await Blog.find().populate('author');
// //         res.render('blogs', { blogs });
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Blog = require('../models/Blog');
// const { ensureAuthenticated } = require('../config/auth');

// // Route to create a new blog (form)
// router.get('/new', ensureAuthenticated, (req, res) => {
//     res.render('new-blog', { user: req.user });
// });

// // Route to post a new blog
// router.post('/new', ensureAuthenticated, async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const newBlog = new Blog({
//             title,
//             content,
//             author: req.user._id
//         });
//         await newBlog.save();
//         res.redirect('/blogs');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// // Route to get a specific blog by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id).populate('author');
//         res.render('blog', { blog, user: req.user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// // Route to get all blogs
// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Blog.find().populate('author');
//         res.render('blogs', { blogs, user: req.user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
// Route to create a new blog (form)
router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('new-blog', { user: req.user });
});

// Route to post a new blog
// router.post('/new', ensureAuthenticated, async (req, res) => {
//     try {
//         const { title, content ,tags } = req.body; // Convert to array of strings

//         const newBlog = new Blog({
//             title,
//             content,
          
//             author: req.user._id
//         });
//         await newBlog.save();
//         res.redirect('/blogs');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

router.get('/blogs/new', (req, res) => res.render('new-blog'));
// router.post('/blogs/new', async (req, res) => {
//     const { title, content, tags, genres } = req.body;
//     const newBlog = new Blog({
//         title,
//         content,
//         author: req.user._id,
//         tags: tags.split(',').map(tag => tag.trim()), // Convert tags to array
//         genres: genres.split(',').map(genre => genre.trim()) // Convert genres to array
//     });
    
//     try {
//         await newBlog.save();
//         res.redirect(`/blogs/${newBlog._id}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// Route to post a new blog
// router.post('/new', ensureAuthenticated, async (req, res) => {
//     try {
//         const { title, content, tags, genres } = req.body;
//         const newBlog = new Blog({
//             title,
//             content,
//             author: req.user._id,
//             tags: tags ? tags.split(',').map(tag => tag.trim()) : [], // Convert tags to array
//             genres: genres ? genres.split(',').map(genre => genre.trim()) : [] // Convert genres to array
//         });
//         await newBlog.save();
//         res.redirect(`/blogs/${newBlog._id}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


// View Blog
// router.get('/blogs/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id).populate('author').populate('reviews.author');
//         res.render('blog', { blog, user: req.user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


// Search blogs by title
router.get('/search', async (req, res) => {
    const searchQuery = req.query.search;

    try {
        // Perform the search query
        const searchResults = await Blog.find({
            title: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
        }).populate('author');

        // Render the search results
        res.render('searchResults', { searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Route to get a specific blog by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findById(req.params.id).populate('author').populate('reviews.author');
//         if (!blog) {
//             return res.status(404).send('Blog not found');
//         }
//         res.render('blogs', { blog, user: req.user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


// Route to post a review for a specific blog
router.post('/:id/reviews', ensureAuthenticated, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        const review = {
            rating,
            comment,
            author: req.user._id
        };
        blog.reviews.push(review);
        await blog.save();
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to get all blogs
// router.get('/', async (req, res) => {
//     try {
//         const blogs = await Blog.find().populate('author');
//         res.render('blogs', { blogs, user: req.user }); // Ensure blogs is passed to the template
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// Route to create a new blog (form)
router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('new-blog', { user: req.user });
});

// Route to post a new blog
router.post('/new', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content, tags, genres } = req.body;
        const newBlog = new Blog({
            title,
            content,
            author: req.user._id,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            genres: genres ? genres.split(',').map(genre => genre.trim()) : []
        });
        await newBlog.save();
        res.redirect(`/blogs/${newBlog._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to get a specific blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author').populate('reviews.author');
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('blog', { blog, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author');
        res.render('blogs', { blogs, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});






module.exports = router;
