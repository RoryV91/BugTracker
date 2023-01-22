//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const db = require('../models');
const Issue = db.Issue;
const security = require('../utils/security')

//==================
//   CREATE ROUTE
//==================
router.post('/create', security.isAuthenticated, async (req, res) => {
    const newIssue = {
        description: req.body.description,
        summary: req.body.summary,
        work: [],
        priority: 0,
        status: 0,
        postedBy: req.body.postedBy,
        assignedTo: null,
        closedBy: null
    }
    Issue.create(newIssue)
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "Issue created successfully"
            })
        })
});

//========================
//    ISSUES BY USER ID
//========================
router.get('/user/:id', security.isAuthenticated, (req, res) => {
    db.Issue.find(
        { 'postedBy': req.params.id },
        (err, issues) => {
            if (err) {
                res.sendStatus(500)
            } else {
               const result = {
                    issues: [issues]
                }
                res.json(result) 
            }
        }
    )  
})

//========================
//    VIEW SINGLE ISSUE
//========================
router.get('/view/:id', security.isAuthenticated, (req, res) => {
    db.Issue.findById(
        req.params.id ,
        (err, issue) => {
            if (err) {
                res.sendStatus(500)
            } else {
                res.json(issue) 
            }
        }
    ).populate({path: 'work', populate: {path: 'supportStaff'}})
    .populate('postedBy')
    .populate('assignedTo')
    .populate('closedBy')
})

//=================================
//   UPDATE ROUTE FOR BASIC USER
//=================================
router.put('/user/update/:id', security.isAuthenticated, async (req, res) => {
    const updatedIssue = await db.Issue.findByIdAndUpdate(
    req.params.id,
    { 
        description: req.body.description, 
        summary: req.body.summary
    },
    { new: true }
    );
    res.json(updatedIssue)
});

//==============================
//   UPDATE ROUTE FOR SUPPORT
//==============================
router.put('/support/update/:id', security.isSupport, async (req, res) => {
    const updatedIssue = await db.Issue.findByIdAndUpdate(
    req.params.id,
    { 
        description: req.body.description, 
        summary: req.body.summary,
        status: req.body.status,
        priority: req.body.priority,
        closedBy: req.body.closedBy
    },
    { new: true }
    ).populate({path: 'work', populate: {path: 'supportStaff'}}); 
    res.json(updatedIssue)
    
});

//============================
//   UPDATE ROUTE FOR ADMIN
//============================
router.put('/admin/update/:id', security.isAdmin, async (req, res) => {
    const updatedIssue = await db.Issue.findByIdAndUpdate(
    req.params.id,
    { 
        description: req.body.description, 
        summary: req.body.summary,
        status: req.body.status,
        priority: req.body.priority,
        assignedTo: req.body.assignedTo,
        closedBy: req.body.closedBy
    },
    { new: true }
    ).populate({path: 'work', populate: {path: 'supportStaff'}}); 
    res.json(updatedIssue)
});

//================================
//   DELETE WORKITEM FROM ISSUE
//================================
router.put('/support/remove/:id', security.isSupport, async (req, res) => {
    const updatedIssue = await db.Issue.findByIdAndUpdate(
    req.params.id,
    { $pull: {
         work: req.body.workItemId 
    }
    
    },
    { new: true }
    );
    res.json(updatedIssue)
});

//===========================
//   ADD WORKITEM TO ISSUE
//===========================
router.put('/support/add/:id', security.isSupport, async (req, res) => {
    const updatedIssue = await db.Issue.findByIdAndUpdate(
        req.params.id,
        { $push: {
            work:{ _id: req.body.workItemId } 
        }
        },
        { new: true }
        ); 
        res.json(updatedIssue)
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

//=================
//   ISSUE INDEX
//=================
router.get('/list', security.isAuthenticated, async (req, res) => {
    Issue.find((err, issues) => {
        const result = 
            issues 
        res.json(result);
    }).populate('postedBy')
    .populate('assignedTo')
    .populate('closedBy');
})

module.exports = router