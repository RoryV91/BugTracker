//==================
//   DEPENDENCIES  
//==================
const mongoose = require("mongoose")
require("dotenv").config()
const connectionString = process.env.MONGODBURI


mongoose.set('strictQuery', false)

//=======================================
//    CONNECT TO MONGODB VIA MONGOOSE
//=======================================

mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//=======================
//   CONNECTION STATUS
//=======================

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to ', connectionString);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to ', connectionString);
});

mongoose.connection.on('error', (error) => {
    console.log('mongoose error ', error);
});

//=================
//  ACCESS MODELS
//=================

module.exports.User = require("./user.js");
module.exports.Issue = require("./issue.js");