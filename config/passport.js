const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
//const passport = require("passport");

module.exports = function (passport){
    let opts = {};
    //opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
     // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   
  opts.secretOrKey  = config.secret;
   // opts.secret = config.secret;
   //opts.secretKey = keys.secretOrKey;
   
   //let pass= passport.use(new JwtStrategy(opts, function(jwt_payload, done)  {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done)  {  
        //console.log('jwt_payload ==',jwt_payload);
       // console.log(jwt_payload);
          
              User.getUserById(jwt_payload._id,( err, User) => {
            if (err){
                return done(err,false);    
            }    

            if(User){
              //  console.log(User);
                return done(null,User);

            }else{
                return done(null,false);
            }

        });

    }));
   // console.log(pass);

}