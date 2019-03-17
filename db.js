//引入模块
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const indexRouter = require('./routes/index.js')
const userRouter = require('./routes/users.js')

//捕获请求
app.use('/',indexRouter)
app.use('/users',userRouter)

// 监听端口
app.listen(2333)

//连接
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

//监听成功失败
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('链接成功')
});


//Schema
let kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    let greeting = this.name ?
        "Meow name is " + this.name :
        "I don't have a name";
    console.log(greeting);
}

let Kitten = mongoose.model('Kitten', kittySchema);
let silence = new Kitten({name: 'Silence'});

silence.save(function (err, silence) {
    if (err) return console.error(err);
    silence.speak();
  });
