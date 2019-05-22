/**
 * 确认pc端admin扫码登录
 * bohong
 */

const LoginModel = require('../../models/login')

exports.LoginPcConfirm = async (req, res) => {
    let openId = req.body.id

    try {

        //查询可以登录名单 openId
        let idList = await LoginModel.find()

        //是否在白名单中
        let hasId = idList.some(item => openId === parseInt(item.openId))

        if(hasId){

            //改变登录状态 true 确认登录
            await LoginModel.updateOne({'openId':'9771'},{'status':true})

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
    } catch (err) {
        res.json({
            code:-200,
            data:err
        })
    }
}