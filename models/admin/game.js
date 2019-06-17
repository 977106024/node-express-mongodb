const mongoose = require('mongoose')
const DB = require('../../mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    name:String,
    describe:String,
    url:String,
    cover:String,
    reta:Number,
    createdTime:Number,
    updateTime:Number
})


const game = DB.hallDB.model('game',gameSchema)

module.exports = game