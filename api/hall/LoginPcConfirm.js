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
            code:-200,
            data:err
        })
    }
}

//是否扫码
exports.ScanningQr = async (req,res) => {
    const {uuid,statusQr} = req.body
    console.log(uuid,statusQr)
    try {
        await qrUuidModel.updateOne({'uuid':uuid},{'statusQr':statusQr})
        res.json({
            code:200,
            data:'OK'
        })
    } catch (err) {
        res.json({
            code:-200,
            data:err
        })
    }
}