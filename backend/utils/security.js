//DETERMINE IF USER IS AUTHENTICATED
function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        next()
    } else {
        res.sendStatus(401)
    }
}

//DETERMINE IF USER IS ADMIN GROUP
function isAdmin(req, res, next) {
    if(req.headers.authorization) {
        const info = jwt.decode(token, process.env.JWTSECRET)
        if (info.userGroup === 2){
            next()
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

//DETERMINE IS USER IS SUPPORT USER GROUP
function isSupport(req, res, next) {
    if(req.headers.authorization) {
        const info = jwt.decode(token, process.env.JWTSECRET)
        if (info.userGroup === 1){
            next()
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isSupport
}