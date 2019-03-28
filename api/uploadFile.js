const Promise = require('bluebird')
const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');
const ffmpeg = require('../utils/ffmpge');
const RecorderModel = require('../models/Recorder')

//multiArgs: true 数组的形式返回多个值
Promise.promisifyAll(multiparty, { multiArgs: true })

// 文件上传
exports.uploadFile = async (req, res) => {
    console.log('录音')

    try {

        //生成multiparty对象，并配置上传目标路径
        const form = new multiparty.Form({
            uploadDir: './api/file/recorder/'
        });

        //解析文件
        const files = await form.parseAsync(req)

        //文件存储路径
        let filePath = files[1].recorder[0].path

        //转换语音格式 wav
        let wavPath = await getWav(filePath)

        //百度AI识别结果
        let result = await baiduAI(wavPath)

        //查库
        let openId = req.decoded.name
        // let findRes = await Recorder.findOne({openId:openId})

        // 存库
        const Recorder = new RecorderModel({
            openId:openId,
            content:result.data.msg[0],
            createdTime:Date.now()
        })
        await Recorder.save()

        //返回结果
        res.json(result)

    } catch (err) {
        console.log(err,2)
        //报错返回
        res.json({
            code: -200,
            data: err.toString()
        })
    }
}


//音频格式转换
function getWav(filePath) {
    return new Promise((resolve, reject) => {
        let wavPath = `${filePath.slice(0, -4)}.wav`
        ffmpeg(filePath)
            .save(wavPath)
            .on('end', function () {
                resolve(wavPath)
            })
            .on('error', function (err) {
                console.log('an error happened: ' + err.message);
                reject(err)
            })
    })
}

//百度AI识别本地语音文件
function baiduAI(wavPath) {
    return new Promise((resolve, reject) => {

        // 百度id Key SecretKey
        const ApiId = '15836284'
        const ApiKey = 'UyKarQWMrQVsTeAVjy6vvhUr';
        const SecretKey = 'yrCNBBKFadHNLYOrrD8G7GrPYtBmLGrY';
        let client = new AipSpeech(0, ApiKey, SecretKey);

        //读取文件
        let voice = fs.readFileSync(wavPath);
        let voiceBase64 = new Buffer(voice);

        // 识别本地语音文件
        client.recognize(voiceBase64, 'wav', 16000).then(function (result) {
            if (result.err_no == 0) {

                //成功识别
                resolve({
                    code: 200,
                    data: {
                        msg: result.result
                    }
                })

            } else {

                //识别失败
                reject({
                    code: -200,
                    data: {
                        err: result
                    }
                })

            }
        }, function (err) {
            reject(err)
        });
    })
}