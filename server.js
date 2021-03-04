//import express
const express = require('express');

const app = express();
//establish port
const PORT = process.env.PORT || 8080;
//enable .json and url coding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set static public access folder
app.use(express.static('public'));
//import apiroutes
require('./routes/apiRoutes.js')(app);
//import htmlroutes
require('./routes/htmlRoutes')(app);
//start listening
app.listen(PORT, function() {
    console.log('app listening on PORT: ' + PORT);
});
