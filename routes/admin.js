/**
 * admin 游戏大厅后台
 */

const express = require('express')
const router = express.Router()
const adminLogin = require('../api/admin/QrLogin')
const {Upload} = require('../api/admin/Upload')
const game = require('../api/admin/Game')


//登录
router.get('/QrLogin',adminLogin.QrLogin)
router.get('/LoginStatus',adminLogin.LoginStatus)
router.get('/statusQr',adminLogin.statusQr)
//图片上传
router.post('/Upload',Upload)
//新增游戏
router.post('/AddGame',game.AddGame)
//游戏列表
router.get('/GetGameList',game.GetGameList)
//游戏详情
router.get('/GetGameDetails',game.GetGameDetails)
//游戏删除
router.post('/RemoveGame',game.RemoveGame)
//游戏更新
router.post('/UpGame',game.RemoveGame)
module.exports = router