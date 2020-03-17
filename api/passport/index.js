import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models'
import { SECRET } from '../constants'

var ExtractJwt = passportJWT.ExtractJwt
var JWTStrategy = passportJWT.Strategy

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = SECRET

const jwtStrategy = new JWTStrategy(jwtOptions, function (payload, done) {
  User._getByUUID(payload.uuid)
    .then(u => {
      if(!u) {
        return done(new Error("User not found"), false)
      } else {
        let user = u.toObject()
        return done(null, user)
      }
    })
    .catch(err => {
      return done(err, false)
    })
})

export const authGuard = function(roles) {
  return passport.authenticate('jwt', {session: false})
}

export const createToken = function(user) {
  return jwt.sign(user, SECRET, { expiresIn: '1h' }) //TODO : add env variables (hash and jwt secrets)
  // todo: add roles to token
}

export const verifyToken = function (token) {
  return jwt.verify(token, SECRET)
}

passport.use(jwtStrategy)

export default passport