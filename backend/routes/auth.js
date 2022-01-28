var express = require('express');
const User = require("../models/User");
var router = express.Router();


//Create a user using:POST "api/auth". doesnt require Auth
router.post('/', function (req, res) {
    console.log(req.body);
    const user = User(req.body);
    user.save();
   res.send(req.body);
  })
  
  module.exports = router