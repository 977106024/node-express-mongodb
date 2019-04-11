const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const textExtractSchema = new Schema({
    openId:String,
    text:Array,
    createdTime:Number,
})

const textExtract = mongoose.model('textExtract',textExtractSchema)

module.exports = textExtract