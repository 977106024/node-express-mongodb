/**
 * admin
 */

const express = require('express')
const router = express.Router()
const admin = require('../api/admin/QrLogin')


router.get('/QrLogin',admin.QrLogin)
module.exports = router