const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
    

router.get('/google/callback',
passport.authenticate('google',{failureRedirect:'/'}),
(reeq,res) => {
        res.redirect('/dashboard');
});

router.get('/verify',(req,res) =>{
        if(req.user){
                console.log(req.user);
        }else{
                console.log('no ');
        }
});
router.get('/logout',(req,res) =>{
      req.logout();
      res.redirect('/');
});


module.exports = router;