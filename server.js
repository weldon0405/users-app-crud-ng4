// Express
let express = require("express");
let app = express();

// Mongo Database
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/userSchema')


const path = require("path");

// Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Folder
