const multiparty = require('multiparty')
const AipSpeech = require("baidu-aip-sdk").speech;
const fs = require('fs');

// 文件上传
exports.uploadFile = (req, res) => {
    console.log('录音22')
    //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({ uploadDir: './file/recorder' });
    //解析
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err)
            res.json({
                code: -200,
                msg: '错误'
            })
        } else {
            const ApiKey = '15836284';
            const SecretKey = 'UyKarQWMrQVsTeAVjy6vvhUr';
            // let client = new AipSpeech(0, ApiKey, SecretKey);
            // let voice = fs.readFileSync('../assets/16k_test.pcm');
            // let voiceBase64 = new Buffer(voice);
            let file = files.file[0];
            console.log(file.path)

            // 识别本地语音文件
            // client.recognize(voiceBase64, 'pcm', 16000).then(function(result) {
            //     console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
            // }, function(err) {
            //     console.log(err);
            // });
            res.json({
                code: '2',
                data: {
                    msg: '?'
                }
            })
        }
    })
}