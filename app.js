//引入模块
const express = require('express')
const app = express()
const routes = require('./routes/index')
const routesAdmin = require('./routes/admin')
const routesHall = require('./routes/hall')
const jwt = require('jsonwebtoken')
const fs = require('fs')


// http https
const http = require('http')
const https = require('https')
const options = {
    key: fs.readFileSync('utils/ssl/2114558_api.xuewuzhijing.top.key'),
    cert: fs.readFileSync('utils/ssl/2114558_api.xuewuzhijing.top.pem')
}


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});


//post请求解析
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//不需要登录的接口
const noLogin = ['/weChatApp/login', '/admin/QrLogin',
    '/hall/LoginPcConfirm', '/admin/LoginStatus',
'/hall/scanningQr','/admin/statusQr','/admin/Upload']

//中间件拦截请求
app.use((req, res, next) => {

    let isLogin = noLogin.some(function (item) {
        return req.path === item
    })

    //跳过登录
    if (isLogin) {
        next()
    } else {

        //从不同的方式拿token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {

            //验证token
            jwt.verify(token, 'xiaoyue', function (err, decoded) {
                if (err) {
                    res.json({
                        code: 400,
                        data: {
                            msg: '无效的token'
                        }
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            //没有带token
            res.json({
                code: 401,
                data: {
                    msg: '没有登录！'
                }
            })
        }
    }
})

//捕获请求
app.use('/weChatApp', routes) //小程序
app.use('/admin', routesAdmin) //admin
app.use('/hall', routesHall) //hall

// 监听端口
// app.listen(2333)
http.createServer(app).listen(2333)
// https.createServer(options, app).listen(443)

/**
 * 响应码：
 * 200 ok
 * -200 error
 * 400 无效的token
 * 401 无权限
 * 300 catch捕获的错误
 */