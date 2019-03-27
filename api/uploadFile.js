const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');
const ffmpeg = require('../utils/ffmpge');

// 文件上传
exports.uploadFile = (req, res) => {
    console.log('录音22')
    console.log(req.decoded.name)

    //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({
        uploadDir: './api/file/recorder/'
    });

    //解析
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: -200,
                msg: '错误'
            })
        } else {

            //文件存储路径
            let filePath = files.recorder[0].path

            //音频格式转换
            ffmpeg(filePath)
            .save(`${filePath.slice(0,-4)}.wav`)
                .on('end', function () {
                    console.log('file has been converted succesfully');
                    let wavPath = `${filePath.slice(0,-4)}.wav`
                    // 百度id Key SecretKey
                    const ApiId = '15836284'
                    const ApiKey = 'UyKarQWMrQVsTeAVjy6vvhUr';
                    const SecretKey = 'yrCNBBKFadHNLYOrrD8G7GrPYtBmLGrY';
                    let client = new AipSpeech(0, ApiKey, SecretKey);
                    let voice = fs.readFileSync(wavPath);
                    let voiceBase64 = new Buffer(voice);

                    // 识别本地语音文件
                    client.recognize(voiceBase64, 'wav', 16000).then(function (result) {
                        if(result.err_no == 0){
                            //成功识别
                            res.json({
                                code: 200,
                                data: {
                                    msg: result.result
                                }
                            })
                        }else{
                            //识别失败
                            res.json({
                                code:-200,
                                data:{
                                    err:result
                                }
                            })
                        }

                    }, function (err) {
                        res.json(err)
                    });
                })
                .on('error', function (err) {
                    console.log('an error happened: ' + err.message);
                })
        }
    })
}