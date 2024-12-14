/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require('../db/index')
// 引入 bcryptjs 库，用于对用户的密码进行 hash 处理
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.regUser = (req, res) => {

  // 接收表单数据
  const userinfo = req.body
// 判断数据是否合法
if (!userinfo.username || !userinfo.password) {
  return res.send({ status: 1, message: '用户名或密码不能为空！' })
}


const sql = `select * from ev_users where username=?`
 

db.query(sql, [userinfo.username], function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
    debugger
    return res.send({ status: 1, message: err.message }) 
  }


  // 用户名被占用
  if (results.length > 0) {
    return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
  }

  // TODO: 用户名可用，继续后续流程...
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)

})
  // res.send({ status: 0, message: '注册成功' })

  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    res.send('login OK')
  }