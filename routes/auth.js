// const express = require('express');
// const passport = require('passport');
// const User = require('../models/User');
// const router = express.Router();

// require('../config/passport')(passport); // Passport config

// router.get('/register', (req, res) => {
//     res.render('register');
// });

// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = new User({ username, password });
//         await user.save();
//         res.redirect('/login');
//     } catch (err) {
//         res.redirect('/register');
//     }
// });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

// router.get('/logout', (req, res) => {
//     req.logout(err => {
//         if (err) return next(err);
//         res.redirect('/');
//     });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Handle
router.post('/register', async (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, username, password, password2 });
    } else {
        try {
            const user = await User.findOne({ username: username });
            if (user) {
                errors.push({ msg: 'Username already exists' });
                res.render('register', { errors, username, password, password2 });
            } else {
                const newUser = new User({ username, password });
                await newUser.save();
                res.redirect('/login');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;
