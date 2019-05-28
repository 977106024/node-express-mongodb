
const mongoose = require('mongoose')
const DB = require('../../mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    name:'',
    url:'',
    cover:'',
    reta:'',
})