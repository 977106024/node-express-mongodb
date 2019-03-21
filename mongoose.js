//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://root:Dx0w71pS7kAgF5g477oHkdt4LNMS7aOHq5FbBypf@hgmzllmfehaj.mongodb.sae.sina.com.cn:10539,vlvgmppvasvq.mongodb.sae.sina.com.cn:10539',{useNewUrlParser:true})
// mongoose.Promise = require('bluebird')
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
})
module.exports = mongoose
