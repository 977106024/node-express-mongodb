const Num = require('../models/add')

// 加数
exports.add = (req,res) => {
    const addNum = new Num({num:'这是一个字符串'})
    addNum.save(function(err){
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
