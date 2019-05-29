/**
 * 游戏
 */

const gameModel = require('../../models/admin/game')

//新增游戏
exports.AddGame = async (req,res) => {
    const {name,url,cover,rate} = req.body

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
        }
    } catch(err){
        res.json({
            code:300,
            data:err
        })
    }
}
