const mongoose = require('mongoose')
const DB = require('../mongoose.js')
const Schema = mongoose.Schema

const userSchema = new Schema({
    openid:String,
    session_key:String
})

const User = DB.weChatAppDB.model('User',userSchema)

module.exports = User