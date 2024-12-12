const express = require('express')
 
const router = express.Router()


//导入用户路由模块
const userHandler = require('../router_handler/user')
//用户注册接口
router.post('/reguser',userHandler.regUser)
//登录接口
router.post('/login',userHandler.login)

module.exports =  router 