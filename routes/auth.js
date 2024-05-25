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
const bcrypt = require('bcryptjs')
// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Handle
// router.post('/register', async (req, res) => {
//     const { username, password, password2 } = req.body;
//     let errors = [];

//     if (!username || !password || !password2) {
//         errors.push({ msg: 'Please enter all fields' });
//     }

//     if (password != password2) {
//         errors.push({ msg: 'Passwords do not match' });
//     }

//     if (errors.length > 0) {
//         res.render('register', { errors, username, password, password2 });
//     } else {
//         try {
//             const user = await User.findOne({ username: username });
//             if (user) {
//                 errors.push({ msg: 'Username already exists' });
//                 res.render('register', { errors, username, password, password2 });
//             } else {
//                 const newUser = new User({ username, password });
//                 await newUser.save();
//                 res.redirect('/login');
//             }
//         } catch (err) {
//             console.error(err);
//             res.status(500).send('Server Error');
//         }
//     }
// });
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
// router.post('/register', async (req, res) => {
//     const { username, password, password2 } = req.body;
//     let errors = [];

//     // Check required fields
//     if (!username || !password || !password2) {
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
//         res.render('register', { errors, username, password, password2 });
//     } else {
//         try {
//             const user = await User.findOne({ username: username });
//             if (user) {
//                 errors.push({ msg: 'Username already exists' });
//                 res.render('register', { errors, username, password, password2 });
//             } else {
//                 const newUser = new User({ username, password });

//                 // Hash password
//                 bcrypt.genSalt(10, (err, salt) => 
//                     bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if (err) throw err;
//                         newUser.password = hash;
//                         newUser.save()
//                             .then(user => {
//                                 req.flash('success_msg', 'You are now registered and can log in');
//                                 res.redirect('/login');
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
