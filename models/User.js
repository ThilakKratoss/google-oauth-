const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

//create schema

const UserSchema = new Schema({
    googleID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    firstName: {
        type:String
    },
    lastName:{
        type:String
    },
    image:{
        type:String
    },
    Age:{
        type:String
    },
    nickName:{
        type:String
    },
    gender:{
        type:String
    }
   

});


//create collection 

mongoose.model('users',UserSchema);