const mongoose = require('mongoose')
const DB = require('../mongoose.js')
const Schema = mongoose.Schema

const textExtractSchema = new Schema({
    openId:String,
    text:Array,
    createdTime:Number,
})

const textExtract = DB.weChatAppDB.model('textExtract',textExtractSchema)

module.exports = textExtract