const passport = require('passport')
const passportJWT = require('passport-jwt')
require('dotenv').config();
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const db = require('../models');
const config = require('./config')

const params = {
  secretOrKey: process.env.JWTSECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function () {
  let strategy = new Strategy(params, (payload, callback) => {
    console.log(payload)
    let user = db.User.findById(payload.id) || null
    if (user) {
      return callback(null, { id: user.id })
    } else {
      return callback(new Error('User not found'), null)
    }
  })

  passport.use(strategy)

  return {
    initialize: function () {
      return passport.initialize()
    },
    authenticate: function () {
      return passport.authenticate('jwt', { session: false })
    }
  }
}