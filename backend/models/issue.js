//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//==================
//   ISSUE SCHEMA  
//==================

const issueSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        priority: {
            type: Number
        },
        status: {
            type: Number,
        }
    }
);

//==============================
//   MODEL USING ISSUE SCHEMA  
//==============================

const Issue = mongoose.model('User', userSchema);

//===================
//   EXPORT MODEL  
//===================

module.exports = Issue;