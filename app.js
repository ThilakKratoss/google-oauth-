const express =  require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
//load usermodel
require('./models/User');
//passport config

require('./config/passport')(passport);


//load routes
const auth = require('./routes/auth');

const app = express();

//load keys
const keys = require('./config/keys');

//map global promises
mongoose.Promise = global.Promise;


//mongoose connect
mongoose.connect(keys.mongoURI,{
    useNewUrlParser:true
})
.then(()=>console.log('MOngo connected'))
.catch(err => console.log(err)); 


app.get('/',(req,res)=>{
    res.send('it works')
});

app.use(cookieParser());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global variable 
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});

//use Routes
app.use('/auth',auth);



    

const port = process.env.PORT || 5500;

app.listen(port , ()=>{
    console.log('Server started');
});




