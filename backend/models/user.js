//==================
//   DEPENDENCIES  
//==================
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//==================
//   USER SCHEMA  
//==================

const userSchema = new Schema(
    {
        email: { 
            type: String,
            unique: true,
            required: true
        },
        password: { 
            type: String
        },
        firstName: { 
            type: String
        },
        lastName: {
            type: String
        },
        userGroup: {
            type: Number,
            default: 0
        },
        verified: {
            type: Boolean,
            default: false,
            required: true
        }
    }
);

//=============================
//   MODEL USING USER SCHEMA  
//=============================

const User = mongoose.model('User', userSchema);

//===================
//   EXPORT MODEL  
//===================

module.exports = User;