/**
 * 生成二维码
 * bohong
 */

const QRCode = require('qrcode')
const uuidv1 = require('uuid/v1')
const qrUuidModel = require('../../models/admin/qrUuid')

exports.QrLogin = async (req, res) => {
    let uuid = uuidv1()
    let url = `${req.query.url}?uid=${uuid}`

    try {

        //存库uuid
        const qrUuid = new qrUuidModel({
            uuid: uuid,
            status:false,
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

exports.LoginStatus = async (req,res) => {
    let uuid = req.query.uuid

    //查询uuid信息
    let uuidInfo = await qrUuidModel.findOne({'uuid':uuid})

    //返回登录状态 Boolean
    res.json({
        code:200,
        data:uuidInfo.status
    })
}


