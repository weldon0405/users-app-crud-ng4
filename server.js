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
app.use(express.static(__dirname + './public/dist'));






// Routes

app.all('*', (req, res, next) => {
  res.sendfile(path.resolve('./public/dist/index.html'))
});

// Server Listening at 1337
app.listen(1337, () => console.log("Server running at 1337"));
