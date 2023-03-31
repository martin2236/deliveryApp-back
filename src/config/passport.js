const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Keys = require('./keyGenerator');
const Usuario = require('../models/usuario')

module.exports = (passport) =>{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRETORKEY;

    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        Usuario.findByPk(jwt_payload.id, (err, user) =>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user)
            }
            else{
                return done(null, false)
            }
        })
    }))
}