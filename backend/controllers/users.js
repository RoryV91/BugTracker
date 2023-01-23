//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken')
const security = require('../utils/security')
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const transport = require('../utils/email');


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
                                res.sendStatus(500)
                            }
                        })
                    // Send an error if the user already exists
                } else {
                    res.sendStatus(500)
                }
            })
        // Send an error if the request body does not have an email
    } else {
        res.sendStatus(500)
    }
})

//=================
//   LOG IN ROUTE
//=================
router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({ email: req.body.email }, async (err, user) => {
            if (err || (!user)) {
                res.sendStatus(404)
            } else {
                const match = await bcrypt.compare(req.body.password, user.password)
                if (match === true) {
                    const payload = { 
                        id: user._id,
                        email: user.email,
                        userGroup: user.userGroup,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userId: user._id
                    }
                    const secOptions = {
                        expiresIn: "60m", 
                        algorithm: 'HS256'
                    }
                    const refreshSecOptions ={
                        expiresIn: "48h",
                        algorithm: 'HS256'
                    }
                    const accessToken = jwt.sign(
                        payload, 
                        process.env.JWTSECRET, 
                        secOptions
                    )
                    const refreshToken = jwt.sign(
                        {id: user._id},
                        process.env.REFRESHJWTSECRET,
                        refreshSecOptions
                    )
                    res.json({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userGroup: user.userGroup,
                        email: user.email,
                        userId: user._id
                    })
                } else {
                    res.sendStatus(401)
                }
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
    console.log(JSON.stringify(req.body));
    if (req.body.email && req.body.firstName && req.body.lastName ) {
        if (req.body.password && req.body.password.length > 0) {
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
            updatedUser = {
                email: req.body.email,
                password: hashPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userGroup: req.body.userGroup
            }
        } else {
            updatedUser = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userGroup: req.body.userGroup
            }
        }
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user || (req.body.email === user.email)) {
                    User.findByIdAndUpdate(req.params.id, updatedUser, {new: true})
                        .then((user) => {
                            const payload = {
                                id: user._id,
                                email: user.email,
                                userGroup: user.userGroup,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userId: user._id
                            }
                            const secOptions = {
                                expiresIn: "10m", 
                                algorithm: 'HS256'
                            }
                            const refreshSecOptions ={
                                expiresIn: "48h",
                                algorithm: 'HS256'
                            }
                            const accessToken = jwt.sign(
                                payload, 
                                process.env.JWTSECRET, 
                                secOptions
                            )
                            const refreshToken = jwt.sign(
                                {id: user._id},
                                process.env.REFRESHJWTSECRET,
                                refreshSecOptions
                            )
                            res.json({
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userGroup: user.userGroup,
                                email: user.email,
                                userId: user._id
                            })
                        })
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
router.post('/create/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.body.email)
 if (req.body.password && req.body.firstName && req.body.lastName) {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
    let verifyUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPassword,
        verified: true
    }
    User.findByIdAndUpdate(req.params.id, verifyUser, { new: true })
        .then((user) => {
            console.log("next step")
            if (user) {
                console.log("user exists")
                const payload = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userGroup: user.userGroup,
                    email: user.email,
                    userId: user._id
                }
                const secOptions = {
                    expiresIn: "60m", 
                    algorithm: 'HS256'
                }
                const refreshSecOptions ={
                    expiresIn: "48h",
                    algorithm: 'HS256'
                }
                const accessToken = jwt.sign(
                    payload, 
                    process.env.JWTSECRET, 
                    secOptions
                )
                const refreshToken = jwt.sign(
                    {id: user._id},
                    process.env.REFRESHJWTSECRET,
                    refreshSecOptions
                )
                res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userGroup: user.userGroup,
                    email: user.email,
                    userId: user._id
                })
                console.log("success")
            } else {
                res.sendStatus(404)
            }
                })
    } else {
        res.sendStatus(401)
    }
}
)

//================================
//   DELETE ROUTE / DELETE USER 
//================================
router.delete('/delete/:id', security.isAdmin, (req, res) => {
    db.User.findByIdAndDelete(req.params.id, (err, user) => {
        res.sendStatus(200)
    })
});

//==================================================
//   REFRESH TOKEN ROUTE / ISSUE NEW ACCESS TOKEN
//==================================================
router.post('/refresh_token', async (req, res) => {
    const tokenString = req.body.refreshToken
    const token = tokenString.replace("Bearer ", "");
    if (token) {
        try {
            const refresh = await jwt.verify(token, process.env.REFRESHJWTSECRET, {algorithm: ['HS256']})
            if (!refresh) {
                res.sendStatus(401)
            }
            else {
                User.findById(token.id, async (err, user) => {
                    if (err || user == null) {
                        res.sendStatus(404)
                    } else {
                        const payload = { 
                        id: user._id,
                        email: user.email,
                        userGroup: user.userGroup,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userId: user._id
                        }
                        const secOptions = {
                            expiresIn: "6h", 
                            algorithm: 'HS256'
                        }
                        const accessToken = jwt.sign(
                            payload, 
                            process.env.JWTSECRET, 
                            secOptions
                        )
                        res.json({
                            accessToken: accessToken,
                            email: user.email,
                            userGroup: user.userGroup,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userId: user._id
                        })
                    }
                })
            }  
        } catch (e) {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
});

//======================
//   ADMIN USER INDEX
//======================
router.get('/list', security.isAdmin, async (req, res) => {
    User.find((err, users) => {
        res.json(users);
    });
})

//======================
//   VIEW SINGLE USER
//======================
router.get('/view/:id', security.isAuthenticated, (req, res) => {
    db.User.findById(
        req.params.id ,
        (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.json(user) 
            }
        }
    )
})

//==============================
//   UNPROTECTED LOOKUP EMAIL
//==============================
router.get('/lookup/:id', (req, res) => {
    db.User.findById(
        req.params.id ,
        (err, user) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.json(user) 
            }
        }
    )
})

//======================
//   SUPPORT LIST
//======================
router.get('/supportList', security.isAdmin, async (req, res) => {
    User.find({userGroup: { $gte: 1} }, (err, users) => {
        res.json(users);
    });
})

//============================
//   INVITE UNVERIFIED USER
//============================
router.post('/invite', security.isAdmin, async (req, res) => {
    var mailOptions = {
    from: 'DoNotReply.MAJOR-Bugtracker@gmail.com',
    to: req.body.email,
    subject: 'Your access link to Major',
    text: `Hello! \n` + `This is your unique link to sign up for Major: \n` + '\n' + `Please click the link to sign up for your account. Contact your administrator for any firther questions. Have a nice day! \n` + req.body.base_url + `\n` + `Thanks! \n Major Admin Team`
  };
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res(info.response);
    }
  });

}
)




module.exports = router

