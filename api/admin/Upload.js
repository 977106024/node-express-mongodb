
const Promise = require('bluebird')
const multiparty = require('multiparty')

//multiArgs: true 数组的形式返回 [多个值,,]
Promise.promisifyAll(multiparty, {
    multiArgs: true
})

exports.Upload = async (req,res) =>{

    //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form({
        uploadDir: './api/file/imgChangeText/'
    });

    try {

        //解析文件
        const files = await form.parseAsync(req)

        //文件存储路径
        let filePath = files[1].imgfile[0].path

        res.json({
            code:"200",
            data:`https://img.xuewuzhijing.top/game/${filePath}`
        })

    } catch (err) {
        res.json({
            res:300,
            data:err
        })
    }
}