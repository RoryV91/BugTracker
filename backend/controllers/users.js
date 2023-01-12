//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const security = require('../utils/security')
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;


//===================================
//   CREATE ROUTE / REQUEST ACCESS
//===================================
router.post('/request', async (req, res) => {
    // Verify the request body has an username and password
    if (req.body.email) {
        // Make a new user object with the request body and password
        let newUser = {
            email: req.body.email
        }
        // Check if a user exists with the same username and password
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    User.create(newUser)
                        .then(user => {
                            if (user) {
                                res.sendStatus(200)
                            } else {
                                res.sendStatus(401)
                            }
                        })
                    // Send an error if the user already exists
                } else {
                    res.sendStatus(401)
                }
            })
        // Send an error if the request body does not have an email
    } else {
        res.sendStatus(401)
    }
})

//==================================
//   LOG IN ROUTE / FIND ONE USER
//==================================
router.post('/login', (req, res) => {
    // Attempt to find the user by their username and password in the database
    if (req.body.email && req.body.password) {
        User.findOne({ username: req.body.email }, async (err, user) => {
            if (err || user == null) {
                res.sendStatus(404)
            }
            // check to:
            // 1. make sure the user was found in the database
            // 2. make sure the user entered in the correct password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (match === true) {
                const payload = { id: user._id, username: user.email }
                const token = jwt.encode(payload, config.jwtSecret)
                res.json({
                    token: token,
                    username: user.email,
                    userId: user._id
                })
            } else {
                res.sendStatus(401)
            }
        })
    } else {
        res.sendStatus(401)
    }
});

//========================================
//   UPDATE ROUTE / CHANGE USER PROFILE
//========================================
router.put('/update/:id', security.isAuthenticated, async (req, res) => {
    let updatedUser;
    if (req.body.email && req.body.firstName && req.body.lastName ) {
        if (req.body.password && req.body.password.length > 0) {
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
            updatedUser = {
                email: req.body.email,
                passowrd: hashPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        }
        updatedUser = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user || (req.body.email === user.email)) {
                    User.findByIdAndUpdate(req.params.id, updatedUser)
                        if (user) {
                            const payload = {
                                id: user._id,
                                email: user.email,
                                userGroup: user.userGroup,
                                firstName: user.firstName,
                                lastName: user.lastName
                            }
                            const token = jwt.encode(payload, process.env.JWTSECRET)
                            res.json({
                                token: token
                            })
                        }
                } else {
                    res.sendStatus(402)
                }
            })
    } else {
        res.sendStatus(401)
    }
});

//============================================
//   UPDATE ROUTE / SETUP INITIAL USER INFO
//============================================
router.post('signup/:id', async (req, res) => {
 // Verify the request body has an username and password
 if (req.body.username && req.body.password) {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
    // Make a new user object with the request body and password
    let newUser = {
        email: req.body.username,
        password: hashPassword
    }
    // Check if a user exists with the same username and password
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                User.create(newUser)
                    .then(user => {
                        if (user) {
                            const payload = {
                                id: user._id,
                                username: user.username
                            }
                            const token = jwt.encode(payload, config.jwtSecret)
                            res.json({
                                token: token,
                                username: user.username,
                                userId: user._id
                            })
                        } else {
                            res.sendStatus(401)
                        }
                    })
                // Send an error if the user already exists
            } else {
                res.sendStatus(401)
            }
        })
    // Send an error if the request body does not have an username and password
} else {
    res.sendStatus(401)
}
})


//================================
//   DELETE ROUTE / DELETE USER 
//================================
router.delete('/delete/:id', /*security.isAdmin,*/ (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, user) => {
        res.sendStatus(200)
    })
});


module.exports = router

