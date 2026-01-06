
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('connected to the database')
    }).catch((err)=>{
        console.log(err,'failed to connect with db')
    })
}

module.exports = connectToDb