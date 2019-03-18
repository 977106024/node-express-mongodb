const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const textSchema = new Schema({
    text:String
})

const Text = mongoose.model('Text',textSchema)

module.exports = Text
