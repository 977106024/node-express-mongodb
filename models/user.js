const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const userSchema = new Schema({
    openid:String,
    session_key:String
})

const User = mongoose.model('User',userSchema)

module.exports = User