const Promise = require('bluebird')
const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');
const ffmpeg = require('../utils/ffmpge');
const Recorder = require('../models/Recorder')

//multiArgs: true 数组的形式返回多个值
Promise.promisifyAll(multiparty, {
    multiArgs: true
})

// 文件上传
exports.uploadFile = async (req, res) => {
    console.log('录音22')

    //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({
        uploadDir: './api/file/recorder/'
    });

    const files = await form.parseAsync(req)
    console.log(files)
}

//读取文件
const readFiles = (req) => {
    return new Promise((resolve, reject) => {

        //生成multiparty对象，并配置上传目标路径
        const form = new multiparty.Form({
            uploadDir: './api/file/recorder/'
        });

        //解析
        form.parse(req, (err, fields, files) => {
            if (err) {
                // res.json({
                //     code: -200,
                //     msg: '错误'
                // })
                reject(err)
            } else {

                //文件存储路径
                let filePath = files.recorder[0].path
                resolve(filePath)
            }
        })
    })
}