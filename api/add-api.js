const TextModels = require('../models/add')

// 加数
exports.add = (req,res) => {
    const {content} = req.body
    const Text = new TextModels({text:content})
    console.log(Text)
    return
    Text.save(function(err){
        if(err){
            res.send(err)
        }else{
            console.log('保存成功！！！')
            const num = [{
                a:'保存成功！！！'
            }]
            res.send(num)
        }
    })
}
