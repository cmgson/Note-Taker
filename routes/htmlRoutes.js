const path = require('path');
//import path
module.exports = function (app) {
//get route to return the notes page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
//get route to return the homepage to the user
    app.get('*', function (req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
}