//==================
//   DEPENDENCIES  
//==================
const express = require('express');
const app = express();
require('dotenv').config();
const path = require("path")
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const cors = require('cors');
const userCtrl = require('./controllers/users');
const issueCtrl = require('./controllers/issues');
const workItemCtrl = require('./controllers/workItems');

//================
//   MIDDLEWARE
//================
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.static(path.join(path.dirname(__dirname), "major", "build")))

//Controllers
app.use('/users', userCtrl);
app.use('/issues', issueCtrl);
app.use('/workItems', workItemCtrl);

// any other route not matching the routes above gets routed by React
app.get("*", (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), "major", "build", "index.html"));
});


// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})