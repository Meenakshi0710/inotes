var express = require('express');
const User = require("../models/User");
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'Iamagoodgirl';


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
      const data = {
        user : {
          id : user.id

        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      res.json({authToken})
      
    } catch(error){
      console.error(error.message);
      res.status(500).send("some error occured")
    }
    }
  );
   
//ROUTE:2 Authenticate a user using:POST "api/auth/login"

router.post('/login',[body('email','Enter a valid email').isEmail(),
                          body('password','password cannot be empty').exists(),
                    ], async function (req, res) {
                      //if there are errors send bad request and show the errors
                        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
     let user = await User.findOne({email});
     if(!user){
       return res.status(400).json({ errors: "please try to login with correct credentials"});
     } 
    
     console.log(password);
     console.log(user.password);
     let passwordCompare = await bcrypt.compare(password,user.password);
     console.log(passwordCompare);
     if(!passwordCompare){
      return res.status(400).json({ errors: "please try to login with correct credentials"});
     }

     const data = {
      user : {
        id : user.id

      }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
      
    }
  })

  //ROUTE:3 get loggedin user details using:POST "api/auth/getuser" login required

  router.post('/getUser', fetchUser, async function (req, res) {
            
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
      
    }
  });
  module.exports = router