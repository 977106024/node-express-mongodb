/**
 * 确认pc端admin扫码登录
 * bohong
 */

const LoginModel = require('../../models/login')

exports.LoginPcConfirm = (req, res) => {
    let openId = req.body.id

    //查询可以登录名单 openId
    LoginModel.find(function(err,result){
        if(err){
            res.json(err)
            return
        }

        //是否在白名单中
        let b = result.some(item => openId === parseInt(item.openId))

        if(b){
            res.json({
                code:200,
                data:'OK'
            })
        }else{
            res.json({
                code:401,
                data:'无权限'
            })
        }
    })

}