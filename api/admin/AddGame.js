
exports.AddGame = (req,res) => {
    const {name,url,cover,reta} = req.body
    res.json({
        code:200,
        data:req.body
    })
}