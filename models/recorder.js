const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const RecorderSchema = new Schema({
    openId:String,
    content:String,
    createdTime:Number,
})

const Recorder = mongoose.model('Recorder',RecorderSchema)

module.exports = Recorder