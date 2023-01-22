//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//======================
//   WORK ITEM SCHEMA  
//======================

const workItemSchema = new Schema(
    {
        task: {
            type: String,
            required: true,
        },
        supportStaff: {
            type: Schema.Types.ObjectId,
            ref:'User'
        }
    },
    {
        timestamps: true
    }
);

//=================================
//   MODEL USING WORKITEM SCHEMA  
//=================================

const WorkItem = mongoose.model('WorkItem', workItemSchema, 'workitems');

//==================
//   EXPORT MODEL  
//==================

module.exports = WorkItem;