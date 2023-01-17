//==================
//   DEPENDENCIES  
//==================
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./');
const User = db.User;
const Issue = db.Issue;

async function hashPassword(plainPassword) {
    const newPassword = await bcrypt.hash(plainPassword, saltRounds)
    return newPassword
}

//==================
//    USER DATA  
//==================

const seed_users = [
    {
        email: "homer.simpson@snp.com",
        password: hashPassword("donut"),
        firstName: "Homer",
        lastName: "Simpson",
        userGroup: 0,
        verified: true
    },

    {
        email: "lenny.leonard@snp.com",
        password: hashPassword("carl"),
        firstName: "Lenny",
        lastName: "Leonard",
        userGroup: 0,
        verified: true
    },

    {
        email: "carl.carlson@snp.com",
        password: hashPassword("lenny"),
        firstName: "Carl",
        lastName: "Carlson",
        userGroup: 0,
        verified: true
    },

    {
        email: "frank.grimes@snp.com",
        password: hashPassword("grimey"),
        firstName: "Frank",
        lastName: "Grimes",
        userGroup: 1,
        verified: true
    },

    {
        email: "weyland.smithers@snp.com",
        password: hashPassword("malibustacey"),
        firstName: "Weyland",
        lastName: "Smithers",
        userGroup: 1,
        verified: true
    },

    {
        email: "monty.burns@snp.com",
        password: hashPassword("excellent"),
        firstName: "Montgomery",
        lastName: "Burns",
        userGroup: 0,
        verified: true
    },
]

db.User.deleteMany({}, (err, users) => {
    if (err) {
        console.log('Error occured in remove', err)
    } else {
        console.log('Removed all users')

        db.User.insertMany(seed_users, (err, users) => {
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

const seed_issues = [
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
            type: mongoose.ObjectId,
            ref: 'WorkItem'
        }],
        priority: {
            type: Number
        },
        status: {
            type: Number
        },
        postedBy:{
            type: mongoose.ObjectId,
            ref: 'User'
        },
        assignedTo : {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        closedBy: {
            type: mongoose.ObjectId,
            ref: 'User'
        }
    }
]

db.Issue.deleteMany({}, (err, issues) => {
    if (err) {
        console.log('Error occured in remove', err)
    } else {
        console.log('Removed all issues')

        db.Issue.insertMany(seed_issues, (err, issues) => {
            if (err) {
                console.log('Error occured in insertMany', err)
            } else {
                console.log('Created', issues.length, "issues")
            }
        })
    }
})