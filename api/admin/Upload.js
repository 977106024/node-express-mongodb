
const Promise = require('bluebird')
const multiparty = require('multiparty')

//multiArgs: true 数组的形式返回 [多个值,,]
Promise.promisifyAll(multiparty, {
    multiArgs: true
})

exports.Upload = async (req,res) =>{

    try {

        //生成multiparty对象，并配置上传目标路径
        let imgPath = './api/file/admin/'
        const form = new multiparty.Form({
            uploadDir: imgPath
        });

        //解析文件
        const files = await form.parseAsync(req)

        //文件存储路径 图片名称
        let filePath = files[1].game[0].path
        let index = filePath.lastIndexOf('\\') //服务器上路径是'//'
        let imgName = filePath.substr(index+1)

        res.json({
            code:"200",
            data:`https://img.xuewuzhijing.top/game/${imgName}`
        })

    } catch (err) {
        res.json({
            res:300,
            data:err
        })
    }
}