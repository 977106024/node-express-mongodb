const mongoose = require('mongoose')
const DB = require('../mongoose.js')
const Schema = mongoose.Schema

const RecorderSchema = new Schema({
    openId:String,
    content:String,
    createdTime:Number,
})

const Recorder = DB.weChatAppDB.model('Recorder',RecorderSchema)

module.exports = Recorder