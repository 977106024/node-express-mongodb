/**
 * 连接多个数据库
 * @type {{hallDB: *, weChatAppDB: *}|*}
 * bohong
 */

const mongoose = require('mongoose')

//连接数据库 weChatApp
const DBURL = 'mongodb://47.101.181.98:27017/weChatApp'
const weChatAppDB = mongoose.createConnection(DBURL,{useNewUrlParser:true,server: {
    auto_reconnect: true,
    poolSize: 10
}})

weChatAppDB.on('error', () => {
    console.log('Mongoose connection error')
});
weChatAppDB.on('connected', () => {
    console.log('连接成功weChatApp')
});


//连接数据库2 hall
const DBURLHALL = 'mongodb://47.101.181.98:27017/hall'
const hallDB = mongoose.createConnection(DBURLHALL,{useNewUrlParser:true,server: {
        auto_reconnect: true,
        poolSize: 10
    }})

hallDB.on('error', () => {
    console.log('Mongoose connection error')
});
hallDB.on('connected', () => {
    console.log('连接成功hall')
});


module.exports = {
    weChatAppDB,
    hallDB
}

