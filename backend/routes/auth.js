var express = require('express');
const User = require("../models/User");
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


//Create a user using:POST "api/auth.createuser". doesn't require Auth
router.post('/createuser',[ body('name','Enter a valid name').isLength({ min: 3 }),
                    body('email','Enter a valid email').isEmail(),
                    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
                    ], async function (req, res) {
                      //if there are errors send bad request and show the errors
                        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   // console.log(req.body);
    //const user = User(req.body);
    //user.save();
    }
    try {
   //check whether the user with this email already exists
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({error:"sorry a user with this email already exist"})
    }
    var salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
      })
      //.then(user => res.json(user)).catch(err => {
      // console.log(err)
     // res.json({error : 'Please enter a unique value',
      //message : err.message})
      res.json({user})
      
    } catch(error){
      console.error(error.message);
      res.status(500).send("some error occured")
    }
    }
  );
   

  
  module.exports = router