const mongoose = require('mongoose')
const DB = require('../mongoose.js')
const Schema = mongoose.Schema

const LoginSchema = new Schema({
    openId:String,
    createdTime:Number,
})

const Login = DB.hallDB.model('Login',LoginSchema)

module.exports = Login