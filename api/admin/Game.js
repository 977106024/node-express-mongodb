/**
 * 游戏
 */

const gameModel = require('../../models/admin/game')

//新增游戏
exports.AddGame = async (req,res) => {
    const {id,name,url,cover,rate} = req.body

    try {
        const game = new gameModel({
            name:name,
            url:url,
            cover:cover,
            reta:rate
        })
        //存库
        await game.save()

        res.json({
            code:200,
            data:'ok'
        })
    }catch (err) {
        res.json({
            code:300,
            data:err
        })
    }
}

//游戏列表
exports.GetGameList = async (req,res) =>{
    const {name, id} = req.query

    try {
        const result = await gameModel.find()
        res.json({
            code:200,
            data:result
        })
    }catch(err){
        res.json({
            code:300,
            data:err
        })
    }
}

//游戏详情
exports.GetGameDetails = async (req,res) => {
    let id = req.query.id

    try {
        const result = await gameModel.findOne({_id:id})
        if(result){
            res.json({
                code:200,
                data:result
            })
        }else{
            res.json({
                code:-200,
                data:'id不存在'
            })
        }
    } catch(err){
        res.json({
            code:300,
            data:err
        })
    }
}

//删除游戏
exports.RemoveGame = async (req,res) => {
    let id = req.body.id

    try {
      const result = await gameModel.findByIdAndDelete({_id:id})
        if(result){
            res.json({
                code:200,
                datq:true
            })
        }else{
            res.json({
                code:-200,
                data:'id不存在'
            })
        }
    }catch(err){
        res.json({
            code:200,
            data:err
        })
    }
}

//更新游戏
exports.UpdateGame = async (req,res) => {
    const {id,name,url,rate,cover} = req.body

    try {
        await gameModel.updateOne({_id:id},{name:name,url:url,rate:rate,cover:cover})
        res.json({
            code:200,
            data:true
        })
    }catch (err) {
        res.json({
            code:300,
            data:err
        })
    }
}
