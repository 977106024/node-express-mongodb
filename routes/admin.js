/**
 * admin 游戏大厅后台
 */

const express = require('express')
const router = express.Router()
const admin = require('../api/admin/QrLogin')


router.get('/QrLogin',admin.QrLogin)
router.get('/LoginStatus',admin.LoginStatus)
router.get('/statusQr',admin.statusQr)
module.exports = router