//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const workItemSchema = require('./workItem.js')

//==================
//   ISSUE SCHEMA  
//==================

const issueSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        work: [{
            type: Schema.Types.ObjectId,
            ref: 'WorkItem'
        }],
        priority: {
            type: Number
        },
        status: {
            type: Number
        },
        postedBy:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        assignedTo : {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        closedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

//==============================
//   MODEL USING ISSUE SCHEMA
//==============================

const Issue = mongoose.model('Issue', issueSchema);

//===================
//   EXPORT MODEL  
//===================

module.exports = Issue;