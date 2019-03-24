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
    request(URL, async (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            //生成token
            const token = jwt.sign(
                {
                    name:data.openid
                },
                "xiaoyue",
                {
                    expiresIn:60*60
                }
            )
            let openid = {'openid':data.openid}
            let session_key = {'session_key':data.session_key}
            try{
                //查询是否有此用户
                let queryRes = await userModel.findOne(openid)
                console.log(queryRes)
                if(queryRes === null){
                    //没有此用户 保存
                    const User = new userModel({
                        openid:data.openid,
                        session_key:data.session_key
                    })
                    await User.save()
                }else{
                    //此用户存在 更新session_key
                    await userModel.update(openid,session_key)
                }
                //成功返回
                res.json({
                    code:200,
                    message:'登录成功',
                    data:{
                        token:token
                    }
                })
            } catch(err) {
                //报错返回
                res.json({
                    code:-200,
                    data:err.toString()
                })
            }
        }
    })
}
