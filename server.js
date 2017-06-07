// Express
let express = require("express");
let app = express();

const path = require("path");

// Static Folder
app.use(express.static(__dirname + '/public/dist'));

// Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Morgan
let morgan = require("morgan");
app.use(morgan("dev"));

// Mongo Database
let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/userSchema')
let UserSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  editable: { type: Boolean, require: true }
})
mongoose.model("User", UserSchema);
let User = mongoose.model("User");


// Routes
// GET Users
app.get("/users", (req, res, next) => {
  console.log("Server > GET  '/users' ");
  User.find({}, (err, users) => {
    return res.json(users);
  })
})
//Create Users
app.post("/users", (req, res, next) => {
  console.log("Server > POST  '/users' > user ", req.body);
  delete req.body._id
  User.create(req.body, (err, user) => {
    if (err) return res.json(err)
    else return res.json(user)
  })
})
// Destroy User
app.delete("/users/:id", (req, res, next) => {
  console.log("Server > DELETE '/users/:id' > id ", req.params.id);
  User.deleteOne({_id:req.params.id}, (err, data) => {
    if (err) return res.json(err)
    else return res.json(true)
  })
})

// app.get("/users", (req, res, next) => {
//   res.json([]);
// })


app.all("*", (req, res, next) => {
  res.sendFile(path.resolve('./public/dist/index.html'))
})

// Server Listening at 1337
app.listen(1337, () => console.log("Server running at 1337"));
