//==================
//   DEPENDENCIES  
//==================
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./');
const mongoose = require('mongoose')
require('dotenv').config();
const User = db.User;
mongoose.set('strictQuery', false)

let newPassword 
async function hashPassword(plainPassword) {  
    return await bcrypt.hash(plainPassword, saltRounds).then(hash=>{console.log(hash); newPassword = hash;return hash;})
}

async function waitForPassword(plainPassword) {
    const password = await hashPassword(plainPassword)
    console.log(password)
    return JSON.stringify(password)
}

//==================
//    USER DATA  
//==================
const seed_users = [
    {
        email: "homer.simpson@snp.com",
        password: "donut",
        firstName: "Homer",
        lastName: "Simpson",
        userGroup: 0,
        verified: true
    },

    {
        email: "lenny.leonard@snp.com",
        password: "carl",
        firstName: "Lenny",
        lastName: "Leonard",
        userGroup: 0,
        verified: true
    },

    {
        email: "carl.carlson@snp.com",
        password: "lenny",
        firstName: "Carl",
        lastName: "Carlson",
        userGroup: 0,
        verified: true
    },

    {
        email: "frank.grimes@snp.com",
        password: "grimey",
        firstName: "Frank",
        lastName: "Grimes",
        userGroup: 1,
        verified: true
    },

    {
        email: "weyland.smithers@snp.com",
        password: "malibustacey",
        firstName: "Weyland",
        lastName: "Smithers",
        userGroup: 1,
        verified: true
    },

    {
        email: "monty.burns@snp.com",
        password: "excellent",
        firstName: "Montgomery",
        lastName: "Burns",
        userGroup: 0,
        verified: true
    },
]
User.deleteMany({}, async (err, users) => {
    if (err) {
        console.log('Error occured in remove', err)
    } else {
        console.log('Removed all users')
        for (let i = 0; i < seed_users.length; i++) {
            let something = await hashPassword(seed_users[i].password)
            console.log(something)
            seed_users[i].password = something
        }
        User.insertMany(seed_users, (err, users) => {
            if (err) {
                console.log('Error occured in insertMany', err)
            } else {
                console.log('Created', users.length, "users")
            }
        })
    }
})


//==================
//    USER DATA  
//==================

// const seed_issues = [
//     {
//         description: {
//             type: String,
//             required: true
//         },
//         summary: {
//             type: String,
//             required: true
//         },
//         work: [{
//             type: mongoose.ObjectId,
//             ref: 'WorkItem'
//         }],
//         priority: {
//             type: Number
//         },
//         status: {
//             type: Number
//         },
//         postedBy:{
//             type: mongoose.ObjectId,
//             ref: 'User'
//         },
//         assignedTo : {
//             type: mongoose.ObjectId,
//             ref: 'User'
//         },
//         closedBy: {
//             type: mongoose.ObjectId,
//             ref: 'User'
//         }
//     }
// ]

// db.Issue.deleteMany({}, (err, issues) => {
//     if (err) {
//         console.log('Error occured in remove', err)
//     } else {
//         console.log('Removed all issues')

//         db.Issue.insertMany(seed_issues, (err, issues) => {
//             if (err) {
//                 console.log('Error occured in insertMany', err)
//             } else {
//                 console.log('Created', issues.length, "issues")
//             }
//         })
//     }
// })