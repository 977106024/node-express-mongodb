const request = require('request')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

// 微信开发者ID
const APPID = 'wxf79a40b8e7cb52b6'
const SECRET = '712ff2b1575d419df67e1c618a53be8e'

//请求微信登录接口
exports.getWxUser = (req, ress) => {
    let code = req.query.code
    const URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`
    request(URL, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            const token = jwt.sign(
                {
                    name:data.openid
                },
                "xiaoyue",
                {
                    expiresIn:60*60
                }
            )
            const User = new userModel({
                openid:data.openid,
                session_key:data.session_key
            })
            let openid = {'openid':data.openid}
            let session_key = {'session_key':data.session_key}
            userModel.find(openid,function(err,res){
                if(res.length === 0){
                    User.save((err)=>{
                        if(err){
                            ress.send(err)
                        }else{
                            ress.send({
                                code:200,
                                message:'登录成功',
                                data:{
                                    token:token
                                }
                            })
                        }
                    })
                }else{
                    userModel.update(openid,session_key,function(err,res){
                        ress.send(res)
                    })
                }
            })
        }
    })
}
