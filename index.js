const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
let app = express();

let mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/movies-mongoose",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

// Middleware
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "This is Working Fine" });
});
 
// PORT
const port = 6000;
app.listen(port,()=>{
    console.log("App is running on port ",port);
});


const movies = require('./routes/movies') ;
const users = require('./routes/user');

let jwt = require('jsonwebtoken');
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// public route
app.use('/users', users);
// private route
app.use('/movies', validateUser, movies);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], 
  req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({
          status:"error", 
          message: err.message, 
          data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
}

//handle error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({
       message: "Sorry!Not found"});
  else 
    res.status(500).json({
        message: "Something is wrong!"});
});


app.use('/movies', validateUser, movies);
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({
          status:"error", 
          message: err.message, 
          data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
  
}





