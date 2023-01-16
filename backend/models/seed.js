//==================
//   DEPENDENCIES  
//==================

const db = require('./')

//==================
//    USER DATA  
//==================

const seed_users = [
    {

    }
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