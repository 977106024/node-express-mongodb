const express = require('express')
const router = express.Router()

router.get('/:name',function(req,res){
    res.send([{
        a: req.params.name,
        b: 2222
    }, {
        c: 333,
        d: 4444
    }])
})

module.exports = router