const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keyGenerator');
const Usuario = require('../models/usuario')

module.exports = (passport) =>{
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRETORKEY
      };

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        try {
          const usuario = await Usuario.buscarPorId(jwt_payload.id);
          if (usuario) {
            console.log('algo')
            return done(null, usuario);
          } else {
            console.log('algo')
            return done(null, false);
          }
        } catch (err) {
            console.log('algo')
          return done(err, false);
        }
      }));
}