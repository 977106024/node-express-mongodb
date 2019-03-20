const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const textSchema = new Schema({
    text:String
})

const Text = mongoose.model('Text',textSchema)
Promise.promisifyAll(Text)
module.exports = Text
