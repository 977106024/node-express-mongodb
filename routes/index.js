const express = require('express')
const router = express.Router()
const userApi = require('../api/user-api.js')
const uploadApi = require('../api/uploadFile.js')


//登录
router.get('/login',userApi.getWxUser)
//上传文件->语音
router.post('/uploadFile',uploadApi.uploadRecorder)
//便签列表
router.get('/noteList',uploadApi.noteList)
//删除便签
router.post('/removeNote',uploadApi.removeNote)
//编辑便签
router.post('/editNote',uploadApi.editNote)
//便签总条数
router.get('/getNoteCount',uploadApi.getNoteCount)

module.exports = router