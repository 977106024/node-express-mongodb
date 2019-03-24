const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');

// 文件上传
exports.uploadFile = (req, res) => {
    console.log('录音22')

    //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({ uploadDir: './api/file/recorder/' });

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

            // 百度id Key SecretKey
            const ApiId = '15836284'
            const ApiKey = 'UyKarQWMrQVsTeAVjy6vvhUr';
            const SecretKey = 'yrCNBBKFadHNLYOrrD8G7GrPYtBmLGrY';
            let client = new AipSpeech(0, ApiKey, SecretKey);
            let voice = fs.readFileSync(filePath);
            let voiceBase64 = new Buffer(voice);

            // 识别本地语音文件
            client.recognize(voiceBase64, 'acc', 16000).then(function(result) {
                console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
            }, function(err) {
                console.log(err);
            });
            res.json({
                code: '2',
                data: {
                    msg: '?'
                }
            })
        }
    })
}