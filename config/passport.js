const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
            try {
                const user = await User.findOne({ username: username });
                if (!user) {
                    console.log('User not found');
                    return done(null, false, { message: 'That username is not registered' });
                }

                // Match password
                const isMatch = await bcrypt.compare(password,user.password);
                // if (isMatch) {
                //     console.log('Password matched');
                //     return done(null, user);
                // } else {
                //     console.log('Incorrect password');
                //     return done(null, false, { message: 'Password incorrect' });
                       console.log('Password matched');
                    return done(null, user);
                // }
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    });
};
