//连接数据库
const mongoose = require('mongoose')
const DBURL = 'mongodb://47.101.181.98:27017/weChatApp'
mongoose.connect(DBURL,{useNewUrlParser:true,server: {
    auto_reconnect: true,
    poolSize: 10
}})
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
    console.log('连接成功')
})

module.exports = mongoose

