const mongo = require('mongoose');

const userschema = mongo.Schema({
    fullname : {
        type:String
    },
    number:{
        type:Number
    },
    role:{
        type:String,
    },
    subrole:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
    },
    confirmpassword : {
        type:String
    },
    location : {
        type:String
    }
});

const user = mongo.model('user' , userschema);
module.exports = user;