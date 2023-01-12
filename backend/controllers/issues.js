//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const db = require('../models');
const Issue = db.Issue;
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const security = require('../utils/security')

//==================
//   CREATE ROUTE
//==================
router.post('/create', security.isAuthenticated, async (req, res) => {
    const newIssue = {
        description: req.body.description,
        work: '',
        priority: 0,
        status: 0,
        postedBy: req.body.name,
        assignedTo: null,
        closedBy: null
    }
    Review.create(newIssue)
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Issue created successfully"
            })
        })
});

//==========================
//    ISSUES BY USER ID
//==========================
router.get('/user/:id', (req, res) => {
    db.User.findById(
        req.params.id,
        (err, user) => {
            if (err) {
                res.sendStatus(500)
                console.log(err)
            } else {
                if (user) {
                    db.Issue.find(
                        { 'postedBy': req.params.id },
                        { description: true, priority: true, work: true, status: true },
                        (err, issues) => {
                            const result = {
                                user: user.email,
                                issues: [issues]
                            }
                            res.json(result)
                        }
                    )
                }
            }
        }
    )
})


//==============================
//   UPDATE ROUTE
//==============================
router.put('/update', security.isSupport, async (req, res) => {
    if (security.isSupport === true){
        const updatedIssue = await db.Issue.findByIdAndUpdate(
        req.body.issueId,
        { description: req.body.description, work: req.body.work, status: req.body.status, priority: req.body.priority,},
        { new: true }
        ); 
        res.json(updatedIssue)
    } else if (security.isSupport === false){
        const updatedIssue = await db.Issue.findByIdAndUpdate(
            req.body.issueId,
            { description: req.body.description},
            { new: true }
            ); 
            res.json(updatedIssue)
    }
});


//==================
//   DELETE ROUTE
//==================

router.delete('/delete/:id', security.isAuthenticated, async (req, res) => {
    Issue.findByIdAndRemove(req.params.id)
        .then(result => {
            res.sendStatus(200)
        })
});


module.exports = router