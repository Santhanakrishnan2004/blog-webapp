// const express = require('express');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const User = require('../models/User');
// const router = express.Router();


// // Register Page
// router.get('/register', (req, res) => res.render('register'));

// // Register Handle
// router.post('/register', async (req, res) => {
//     const { username, email, password, password2 } = req.body;
//     let errors = [];

//     // Check required fields
//     if (!username || !email || !password || !password2) {
//         errors.push({ msg: 'Please enter all fields' });
//     }

//     // Check passwords match
//     if (password !== password2) {
//         errors.push({ msg: 'Passwords do not match' });
//     }

//     // Check password length
//     if (password.length < 6) {
//         errors.push({ msg: 'Password should be at least 6 characters' });
//     }

//     if (errors.length > 0) {
//         res.render('register', { errors, username, email, password, password2 });
//     } else {
//         try {
//             const user = await User.findOne({ email: email });
//             if (user) {
//                 errors.push({ msg: 'Email already exists' });
//                 res.render('register', { errors, username, email, password, password2 });
//             } else {
//                 const newUser = new User({ username, email, password });

//                 // Hash password
//                 bcrypt.genSalt(10, (err, salt) => 
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser.save()
//                             .then(user => {
//                                 req.flash('success_msg', 'You are now registered and can log in');
//                                 res.redirect('/users/login');
//                             })
//                             .catch(err => console.log(err));
//                     })
//                 );
//             }
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Server Error');
//         }
//     }
// });

// // Login Page
// router.get('/login', (req, res) => res.render('login'));

// // router.get('/login', (req, res) => res.render('login'));

// // Login Handle
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/login');
//     });
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', async (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, username, email, password, password2 });
    } else {
        try {
            const user = await User.findOne({ email: email });
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', { errors, username, email, password, password2 });
            } else {
                const newUser = new User({ username, email, password });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    })
                );
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
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
