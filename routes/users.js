//const { Router } = require('express');
const express = require('express');
const router =express.Router();

const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const passport = require('../config/passport');
const passport = require('passport');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    //res.send('REGISTERok');
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
  
    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: 'Failed to register user',
        })
      } else {
        res.json({
          success: true,
          msg: 'User registered',
        })
      }
    });
  });

//Authenticate
//router.get('/authenticate', ( req, res, next) => {
  //  res.json({user: req.user})
  //  res.send('authenticate');
//});
router.post('/authenticate', ( req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err ,user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not Found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {

            if (err) throw err;
            
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, { 
                    expiresIn: 604800  //1 week
                });
             //   jwt.verify(token, config.secret, function(err, data){
             //      console.log(err, data);
             //  })
              //token:'JWT'+ token,
                res.json({
                    success: true,
                    //token: 'JWT'+ token,
                    token: 'Bearer ' + token,
                    user:{
                        id:user._id,
                        name: user.name,
                        username: user.username,
                        email:user.email
                    }
                });

            }else {
                return res.json({success: false, msg:'Wrong Password'});
            }
        });
    } );
    
    
});




//Profile
//router.get('/profile', passport.authenticate('jwt', {session: false}), ( req, res, next) => {
  //  res.json({user: req.user})
  //  res.send('profile');
//});
/*
router.get('/profile',  ( req, res, next) => {
    passport.authenticate('jwt',  {session: false}, function (err, user, info) {      
        if (err) {
            return res.status(401).json(err + 'gggg');
        }
        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({
                "token": token
            });
        } else {
            console.log('jwt_payload ==');
            res.status(401).json(info +'dddd');
        }
    })(req, res, next)


});
*/
router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
 
    res.json({user: req.user});
 
    }
);




module.exports = router;