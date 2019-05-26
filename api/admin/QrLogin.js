/**
 * 生成二维码
 * bohong
 */

const QRCode = require('qrcode')
const uuidv1 = require('uuid/v1')
const qrUuidModel = require('../../models/admin/qrUuid')
const jwt = require('jsonwebtoken')

//获取登录二维码
exports.QrLogin = async (req, res) => {
    let uuid = uuidv1()
    let url = `${req.query.url}?uuid=${uuid}`

    try {

        //存库uuid
        const qrUuid = new qrUuidModel({
            uuid: uuid,
            status:false,
            statusQr:false,
            createdTime: parseInt(Date.now() / 1000)
        })

        await qrUuid.save()

        //生成二维码
        let qrBase64 = await QRCode.toDataURL(url, {width: 350})
        res.json({
            code: 200,
            data: {
                qrImg:qrBase64,
                uuid:uuid
            }
        })
    } catch (err) {
        res.json({
            code: -200,
            data: err
        })
    }
}

//查询uuid登陆者二维码状态 前台是否确认登录 status
exports.LoginStatus = async (req,res) => {
    let uuid = req.query.uuid

    //查询uuid信息
    let uuidInfo = await qrUuidModel.findOne({'uuid':uuid})

    //生成token
    const token = jwt.sign({
            name: uuid,//暂时 后面换成openid
        },
        "xiaoyue", {
            expiresIn: 60 * 60
        }
    )

    //返回登录状态 Boolean
    res.json({
        code:200,
        data:{
            status:uuidInfo.status,
            token:token
        }
    })
}

//二维码状态 是否扫码 statusQr
exports.statusQr = async (req,res) => {
    let uuid = req.query.uuid

    //查询uuid信息
    let uuidInfo = await qrUuidModel.findOne({'uuid':uuid})

    //返回登录状态 Boolean
    res.json({
        code:200,
        data:uuidInfo.statusQr
    })
}


