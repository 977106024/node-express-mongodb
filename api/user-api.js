const request = require('request')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
// 微信开发者ID
const APPID = 'wxf79a40b8e7cb52b6'
const SECRET = '712ff2b1575d419df67e1c618a53be8e'

//请求微信登录接口
exports.getWxUser = (req, res) => {
    let code = req.query.code
    const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`
    request(URL, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const token = jwt.sign(
                {
                    name:body.openid
                },
                "xiaoyue",
                {
                    expiresIn:60*60
                }
            )
            const User = new userModel({
                openid:body.openid,
                session_key:body.session_key
            })
            User.save((err)=>{
                if(err){
                    res.send(err)
                }else{
                    console.log('保存成功！！！')
                    res.send({
                        code:200,
                        message:'登录成功',
                        data:{
                            token:token
                        }
                    })
                }
            })
        }
    })
}
