const mongoose = require('../mongoose.js')
const Schema = mongoose.Schema

const NumSchema = new Schema({
    num:Number
})

const Num = mongoose.model('Num',NumSchema)

module.exports = Num
