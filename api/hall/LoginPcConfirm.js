/**
 * 确认pc端admin扫码登录
 * bohong
 */

const LoginModel = require('../../models/login')
const qrUuidModel = require('../../models/admin/qrUuid')

//确认登陆
exports.LoginPcConfirm = async (req, res) => {
    const {id:openId,uuid} = req.body

    try {

        //查询可以登录名单 openId
        let idList = await LoginModel.find()

        //是否在白名单中
        let hasId = idList.some(item => openId === parseInt(item.openId))

        if(hasId){

            //改变uuid登录状态 true 确认登录
            await qrUuidModel.updateOne({'uuid':uuid},{'status':true})

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
            code:300,
            data:err
        })
    }
}

//是否扫码
exports.ScanningQr = async (req,res) => {
    const {uuid,statusQr,openId} = req.body

    try {

        //查询可以登录名单 openId
        let user = await LoginModel.findOne({'openId':openId})

        if(!user){
            //不在名单中 无权限
            res.json({
                code:401,
                data:false
            })
           return
        }

        //改变statusQr
        let uuidRes = await qrUuidModel.updateOne({'uuid':uuid},{'statusQr':statusQr})
        if(uuidRes.ok === 1 && uuidRes.nModified > 0 && uuidRes.n > 0){
            res.json({
                code:200,
                data:true
            })
        }else{
            //uuid错误
            res.json({
                code:401,
                data:false
            })
        }
    } catch (err) {
        res.json({
            code:300,
            data:err
        })
    }
}
