const userModel = require('../model/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerUser = async (req,res)=>{
    const {username, email, password, phone} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    if(!username || !email || !password || !phone) {
        return res.status(401).json({
            message:'all fields are required'
        })
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:'user already exist'
        })
    }
    const user = await userModel.create({
        username,
        email,
        password:hashedPassword,
        phone
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie('token',token,{
        expiresIn:'1h'
    })
    return res.status(201).json({
        message:'user created successfully',
        user:{
            username:user.username,
            email:user.email,
            password:user.password,
            phone:user.phone
        },
        token
    })     

}

const loginUser = async (req,res)=>{
    const {email, password} = req.body
    const alreadyUserExist = await userModel.findOne({email})
    if(!alreadyUserExist){
     return res.status(404).json({
        message:'user not found'
     })
    }
     
    const isPasswordIsValid = await bcrypt.compare(password,alreadyUserExist.password)
    if(!isPasswordIsValid){
    return res.status(400).json({
        message:'Invalid Email or Password'
    })
    }     

    const token = jwt.sign({email}, process.env.JWT_SECRET)
    res.cookie('token',token)
    return res.status(200).json({
    message:'logged in successfull',
    user:alreadyUserExist,
    token
    })
}

module.exports = {registerUser, loginUser}