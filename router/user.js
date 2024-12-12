const express = require('express')
 
const router = express.Router()



//用户注册接口
router.post('/reguser',(req,res)=>{
res.send('reguser  ok')
})
//登录接口
router.post('/login',(req,res)=>{
    res.send('login  ok')
    })

module.exports =  router 