// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const session = require('express-session');
// // const passport = require('passport');
// // const bodyParser = require('body-parser');
// // const Blog = require('./models/Blog');  // Make sure to require the Blog model

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static('public'));
// // app.set('view engine', 'ejs');

// // // Session and Passport setup
// // app.use(session({
// //     secret: process.env.SECRET,
// //     resave: false,
// //     saveUninitialized: false
// // }));

// // app.use(passport.initialize());
// // app.use(passport.session());

// // // Load Passport config
// // require('./config/passport')(passport);

// // // MongoDB connection
// // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => console.log('MongoDB connected'))
// //     .catch(err => console.log(err));

// // // Routes
// // app.use('/', require('./routes/auth'));
// // app.use('/blogs', require('./routes/blogs'));
// // app.use('/reviews', require('./routes/reviews'));

// // // Home route
// // app.get('/', async (req, res) => {
// //     try {
// //         const blogs = await Blog.find().populate('author'); // Fetch blogs and populate author information
// //         res.render('index', { user: req.user, blogs }); // Pass blogs to the index.ejs template
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send('Server Error');
// //     }
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server started on port ${PORT}`);
// // });
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// // Session and Passport setup
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Load Passport config
// require('./config/passport')(passport);

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Routes
// app.use('/', require('./routes/auth'));
// app.use('/blogs', require('./routes/blogs'));

// // Home route
// app.get('/', async (req, res) => {
//     try {
//         const Blog = require('./models/Blog');
//         const blogs = await Blog.find().populate('author');
//         res.render('index', { user: req.user, blogs });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });
require('dotenv').config();
const flash =require('connect-flash')
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session and Passport setup
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Load Passport config
require('./config/passport')(passport);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/auth'));
app.use('/blogs', require('./routes/blogs'));

// Home route
app.get('/', async (req, res) => {
    try {
        const Blog = require('./models/Blog');
        const blogs = await Blog.find().populate('author');
        res.render('index', { user: req.user, blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
