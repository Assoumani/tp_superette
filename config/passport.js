require('dotenv').config();

const User = require('../models/user'),
    LocalStrategy = require('passport-local').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport');

exports.localStrategy = new LocalStrategy({usernameField: 'email'}, (username, password, done) => {
    console.log('toto')
    User
        .findOne({
            email: username
        })
        .exec((err, user) => {

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {errorMsg: 'Il semblerait que le couple email/mot de passe ne soit pas correct'});
            }

            return done(null, user);

        });

});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET_PATH
}

exports.jwtStrategy = new JwtStrategy(jwtOptions, (payload, done)=>{

    User
        .findById(payload._doc._id)
        .exec((err, user)=>{
            if (err){
                return done(err);
            }

            if (!user){
                return done(null, false);
            }

            return done(null, user);
        })

})

exports.checkIsAuth = (req,res,next)=>{
    if (req.originalUrl.includes(process.env.API_PATH)){
        passport.authenticate('jwt', {session: false}, null)(req, res, next)
    } else {
        next();
    }
}
