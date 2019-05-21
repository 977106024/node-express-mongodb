/**
 * 生成二维码
 * @returns {Promise<void>}
 * @constructor bohong
 */

const QRCode = require('qrcode')

exports.QrLogin = async (req,res) => {
    let url = req.query.url

    try {
        //生成二维码
        res.json(await QRCode.toDataURL(url))
    } catch (err) {
        res.json(err)
    }
}


