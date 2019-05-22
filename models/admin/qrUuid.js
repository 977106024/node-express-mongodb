const mongoose = require('mongoose')
const DB = require('../../mongoose.js')
const Schema = mongoose.Schema

const qruuidSchema = new Schema({
    uuid:String,
    status:Boolean,
    createdTime:Number,
})

const qruuid = DB.hallDB.model('qruuid',qruuidSchema)

module.exports = qruuid