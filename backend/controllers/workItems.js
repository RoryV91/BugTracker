//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const router = express.Router();
const db = require('../models');
const WorkItem = db.WorkItem;
const jwt = require('jsonwebtoken')
const security = require('../utils/security')

//==================
//   CREATE ROUTE
//==================
router.post('/create', security.isSupport, async (req, res) => {
    const newWorkItem = {
        task: req.body.task,
        supportStaff: req.body.supportStaff
    }
    WorkItem.create(newWorkItem)
        .then(result => {
            console.log(result)
            res.json(newWorkItem)
        })
});

//==================
//   UPDATE ROUTE
//==================
router.put('/update/:id', security.isSupport, async (req, res) => {
    const tokenString = req.headers.authorization
    const token = tokenString.replace("Bearer ", "");
    const originalWorkItem = await db.WorkItem.findById(req.params.id)
    if (!originalWorkItem) {
        res.sendStatus(404)
    } else {
        try {
            const info = await jwt.verify(token, process.env.JWTSECRET, {algorithm: ['HS256']})
            if (!info) {
                res.sendStatus(401)
            }
            else if (info._id === originalWorkItem.supportStaff){
                const updatedWorkItem = await db.WorkItem.findByIdAndUpdate(
                    req.params.id,
                    { 
                        task: req.body.task
                    },
                    { new: true }
                ); 
                res.json(updatedWorkItem)
            } else {
                res.sendStatus(401)
            }
        } catch (e) {
            res.sendStatus(401)
        }
    }
});

//==================
//   DELETE ROUTE
//==================

router.delete('/delete/:id', security.isSupport, async (req, res) => {
    WorkItem.findByIdAndRemove(req.params.id)
        .then(result => {
            res.sendStatus(200)
        })
});


module.exports = router