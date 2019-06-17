/**
 * 游戏
 */

const gameModel = require('../../models/admin/game')

//新增游戏
exports.AddGame = async (req,res) => {
    const {id,name,url,cover,rate} = req.body

    try {
        if(id){
            await gameModel.updateOne({_id:id},{name:name,url:url,rate:rate,cover:cover,updateTime: parseInt(Date.now() / 1000)})
            res.json({
                code:200,
                data:true
            })
        }else{
            const game = new gameModel({
                name:name,
                url:url,
                cover:cover,
                reta:rate,
                createdTime:parseInt(Date.now() / 1000)
            })
            //存库
            await game.save()

            res.json({
                code:200,
                data:true
            })
        }
    }catch (err) {
        res.json({
            code:300,
            data:err
        })
    }
}


//游戏列表
exports.GetGameList = async (req,res) =>{
    const query = req.query

    //条件查询 or 默认返回所有
    const param = {}
    for(let key in query){
        if(query[key] && query[key] !== ''){
            if(key === 'id'){
                param._id = query[key]
            }else{
                param[key] = query[key]
            }
        }
    }

    try {
        const result = await gameModel.find(param)
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
            code:300,
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
