/**
 * admin 游戏大厅后台
 */

const express = require('express')
const router = express.Router()
const adminLogin = require('../api/admin/QrLogin')
const adminUpload = require('../api/admin/Upload')


//登录
router.get('/QrLogin',adminLogin.QrLogin)
router.get('/LoginStatus',adminLogin.LoginStatus)
router.get('/statusQr',adminLogin.statusQr)
//图片上传
router.post('/Upload',adminUpload.Upload)
module.exports = router