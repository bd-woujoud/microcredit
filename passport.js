const passport = require('passport');
const userModel = require('./Models/userModel');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; 


function extractJwtFromCookie(req) {
    const token = req.cookies.access_token;
    return token
}

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        userModel.findOne({ email }, (err, user) => {
            if (err)
                return done(err)
            if (user)
                return user.comparePassword(password, done)
            return done(null, false)
        })
    })
)

passport.use(
    new JwtStrategy(
        { jwtFromRequest: extractJwtFromCookie, secretOrKey: process.env.PRIVATE_KEY },
        (payload, done) => {
            userModel.findById({ _id: payload.id}, (err, user) => {
                if (err)
                    return done(err, false)
                if (user)
                    return done(null, user) //<---- attacher un utilisateur entier dans req. user
                return done(null, false)
            })
        }
    )
)