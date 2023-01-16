//==================
//   DEPENDENCIES  
//==================
const jwt = require('jsonwebtoken')
require('dotenv').config();

//DETERMINE IF USER IS AUTHENTICATED
async function isAuthenticated(req, res, next) {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    if (req.headers.authorization) {
        try {
            const info = await jwt.verify(token, process.env.JWTSECRET, {algorithm: ['HS256']})
            if (!info) {
                res.sendStatus(401)
            }
            else {
                next()
            }  
        } catch (e) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

//DETERMINE IF USER IS ADMIN GROUP
async function isAdmin(req, res, next) {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    if (req.headers.authorization) {
        try {
            const info = await jwt.verify(token, process.env.JWTSECRET, {algorithm: ['HS256']})
            if (!info) {
                res.sendStatus(401)
            }
            else if (info.userGroup === 2){
                next()
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

//DETERMINE IS USER IS SUPPORT USER GROUP
async function isSupport(req, res, next) {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    if(req.headers.authorization) {
        try {
            const info = await jwt.verify(token, process.env.JWTSECRET, {algorithm: ['HS256']})
            if (!info) {
                res.sendStatus(401)
            }
            else if (info.userGroup >= 1){
                next()
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isSupport
}