const express = require('express')
const router = express.Router()
const weChatApi = require('../api/add-api.js')
const userApi = require('../api/user-api.js')
console.log(weChatApi.add)

router.post('/weChatApp/add',weChatApi.add)
router.get('/wechatApp/login',userApi.getWxUser)

module.exports = router