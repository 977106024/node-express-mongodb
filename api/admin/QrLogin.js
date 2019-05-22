/**
 * 生成二维码
 * bohong
 */

const QRCode = require('qrcode')

exports.QrLogin = async (req,res) => {
    let url = req.query.url

    try {
        //生成二维码
        let qrBase64 = await QRCode.toDataURL(url,{width:350})
        res.json({
            code:200,
            data:qrBase64
        })
    } catch (err) {
        res.json(err)
    }
}


