const mongoose = require('mongoose')
const userSchema =  mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minLen:[3,'username must be atleast 3 characters long']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        email:[5,'email must be 5 characters long']
    },
    password:{
        type:String,
        required:true,
        minLen:[3, 'password must be altleast 3 characters long'],
    },
    phone:{
        type:Number,
        required:true,
    }
})

const userModel = mongoose.model('user',userSchema)
module.exports = userModel