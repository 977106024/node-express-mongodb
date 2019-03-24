const express = require('express')
const router = express.Router()
const weChatApi = require('../api/add-api.js')
const userApi = require('../api/user-api.js')
const uploadApi = require('../api/uploadFile.js')


router.post('/add',weChatApi.add)
//登录
router.get('/login',userApi.getWxUser)
//上传文件
router.post('/uploadFile',uploadApi.uploadFile)
//工作用
router.get('/admin/zuanshi',function(req,res){
    const data = [
        {
            cfd_consume_status: "1",
            cfd_fangka_source: "1",
            cfd_num: "-2",
            cfd_remain_fangka: "4",
            cfd_type: "normal",
            game_name: "橘子十三张",
            saver_time: "2019-03-19 13:37:39",
            time: "2019-03-19",
            type: "消耗",
            user_id: "1086748",
            user_name: "强势"
        },
        {
            cfd_consume_status: "2",
            cfd_fangka_source: "2",
            cfd_num: "-3",
            cfd_remain_fangka: "5",
            cfd_type: "normal",
            game_name: "橘子十三张",
            saver_time: "2019-03-19 13:37:39",
            time: "2019-03-19",
            type: "消耗",
            user_id: "1086748",
            user_name: "强势"
        }
    ]
    res.send({
        code:0,
        result:data
    })
})

module.exports = router