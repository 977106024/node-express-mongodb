const Promise = require('bluebird')
const multiparty = require('multiparty')
var AipOcrClient = require("baidu-aip-sdk").ocr;

//multiArgs: true 数组的形式返回 [多个值,,]
Promise.promisifyAll(multiparty, { multiArgs: true })

exports.upImgFile = async (req,res) =>{
	//生成multiparty对象，并配置上传目标路径
	const form = new multiparty.Form({
	    uploadDir: './api/file/imgChangeText/'
	});
	
	//解析文件
	const files = await form.parseAsync(req)
	console.log(files)
}

// return
// 设置APPID/AK/SK
var APP_ID = "15981584";
var API_KEY = "X9LE3pz9TPHDFGur4yGg0T2G";
var SECRET_KEY = "AAMxWvGWb7kE3YhhrOS03pzK3VrGbmE7";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var fs = require('fs');

var image = fs.readFileSync("./api/file/imgChangeText/1.jpg").toString("base64");

// 调用通用文字识别, 图片参数为本地图片
client.generalBasic(image).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

// 如果有可选参数
var options = {};
options["language_type"] = "CHN_ENG";
options["detect_direction"] = "true";
options["detect_language"] = "true";
options["probability"] = "true";

// 带参数调用通用文字识别, 图片参数为本地图片
client.generalBasic(image, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});;

var url = "http//www.x.com/sample.jpg";

// 调用通用文字识别, 图片参数为远程url图片
client.generalBasicUrl(url).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

// 如果有可选参数
var options = {};
options["language_type"] = "CHN_ENG";
options["detect_direction"] = "true";
options["detect_language"] = "true";
options["probability"] = "true";

// 带参数调用通用文字识别, 图片参数为远程url图片
client.generalBasicUrl(url, options).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});;