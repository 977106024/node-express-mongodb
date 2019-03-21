// //连接数据库
// const mongoose = require('mongoose')
// const DBURL = 'mongodb://root:Dx0w71pS7kAgF5g477oHkdt4LNMS7aOHq5FbBypf@hgmzllmfehaj.mongodb.sae.sina.com.cn:10539,vlvgmppvasvq.mongodb.sae.sina.com.cn:10539/admin?replicaSet=rs73695'
// mongoose.connect(DBURL,{useNewUrlParser:true})
// // mongoose.Promise = require('bluebird')
// const con = mongoose.connection;
// con.on('error', console.error.bind(console, '连接数据库失败'));
// con.once('open',()=>{
//     //成功连接
//     console.log('连接成功')
// })

// module.exports = mongoose

/*
 * package.json中依赖中写mongodb即可
 * 等同于npm install --save mongodb
 */
var MongoClient = require('mongodb').MongoClient;

/*注意这里的/admin?replicaSet=rsxxxxx不要修改*/
var MONGODB_URI = 'mongodb://root:Dx0w71pS7kAgF5g477oHkdt4LNMS7aOHq5FbBypf@hgmzllmfehaj.mongodb.sae.sina.com.cn:10539,vlvgmppvasvq.mongodb.sae.sina.com.cn:10539/admin?replicaSet=rs73695';

/*这里替换成你需要写的database名称*/
const dbName = 'project';

/*insert data function*/
const insertDocuments = function (db, collection_name, callback) {
    // Get the documents collection
    var collection = db.collection(collection_name);
    // Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

/*读取数据函数*/
const findDocuments = function (db, collection_name, callback) {
    // Get the documents collection
    var collection = db.collection(collection_name);
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

/*开始连接数据库*/
MongoClient.connect(MONGODB_URI, function (err, client) {
    if (err) throw err;
    console.log('connected success.');
    const db = client.db(dbName);
    /*开始写入数据*/
    insertDocuments(db, 'documents', function (result) {
        console.log('insert data success.');
        console.log(result);
        /*开始读取数据*/
        findDocuments(db, 'documents', function (result) {
            console.log('read data success.');
            console.log(result);
        });
    });
});