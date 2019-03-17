//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})
// mongoose.Promise = global.Promise
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
})
module.exports = mongoose
