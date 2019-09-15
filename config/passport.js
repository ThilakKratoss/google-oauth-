const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = mongoose.model('users');




module.exports = function(passport){
    passport.use(
       new GoogleStrategy({
           clientID:keys.googleClientID,
           clientSecret:keys.googleClientSecret,
           callbackURL:'/auth/google/callback',
           proxy:true

       }, (accessToken,refreshToken,profile,done)=>{
          console.log(accessToken);
          console.log(profile);
        // const image = profile.photos[0].value.subString(0 ,profile.photos[0].value.indexOf('?'));
        // console.log(image);

        const newUser = {
            googleID :profile.id,
            name:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.emails[0].value,
            image:profile.photos[0].value,
            Age:'undefined',
            nickName:'undefined',
            gender:'undefined'
                    }
        //check for existing user
       User.findOne({
           googleID : profile.id
       }).then(user => {
           if(user){
              //return user
            done(null,user);
           }else{
            //create user 
            new User(newUser)
            .save()
            .then(user => done(null,user));
           }
       })

       }) 
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id).then(user => done(null,user));  
    });
}


