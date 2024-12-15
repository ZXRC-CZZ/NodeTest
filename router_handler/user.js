/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
const db = require('../db/index')
// 引入 bcryptjs 库，用于对用户的密码进行 hash 处理
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')


// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
// 判断数据是否合法
// if (!userinfo.username || !userinfo.password) {
//   // return res.send({ status: 1,success:false, message: '用户名或密码不能为空！' })
//   return res.cc('用户名或密码不能为空！' ,1,false)

// }

const sql = `select * from ev_users where username=?`
 

db.query(sql, [userinfo.username], function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
    // return res.send({ status: 1, success:false,message: err.message }) 
    return res.cc(err,1,false)

  }


  // 用户名被占用
  if (results.length > 0) {
    // return res.send({ status: 1,success:false, message: '用户名被占用，请更换其他用户名！' })
    return res.cc('用户名被占用，请更换其他用户名！')

  }

  // TODO: 用户名可用，继续后续流程...
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)
  //1.要插入的数据
const user = {username:userinfo.username,password:userinfo.password}
//2.执行的sql语句  其中 ? 表示占位符
const sqlstr = 'insert into ev_users set ?'


//1.要插入的数据
db.query(sqlstr, user, function (err, results) {
// 执行 SQL 语句失败
// if (err) return res.send({ status: 1,success:false, message: err.message })
if (err) return res.cc(err)

// SQL 语句执行成功，但影响行数不为 1
// if (results.affectedRows !== 1)  return res.send({ status: 1,success:false, message: '注册用户失败，请稍后再试！' })
if (results.affectedRows !== 1)  return res.cc('注册用户失败，请稍后再试！')


// 注册成功
// res.send({ status: 0,success:true, message: '注册成功！' })
res.cc('注册成功！',0,true)

})
})



  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    //拿到传过来的数据
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'

    
    db.query(sql,userinfo.username,function(err,results){
          // 执行 SQL 语句失败
      if (err)  return res.cc(err,1,false)
      // 没有该用户
      if (results.length != 1)  return res.cc('未查找到该用户')
      //判断密码是否正确
      // 拿着用户输入的密码进行加密,和数据库中存储的密码进行对比
      const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
      // 如果对比的结果等于 false, 则证明用户输入的密码错误
      if (!compareResult)  return res.cc('登录失败！，密码错误')

      // TODO：登录成功，生成 Token 字符串
          // 剔除用户敏感信息，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
          const user = { ...results[0], password: '', user_pic: '' }
          // 导入配置文件
           const config = require('../config')

          // 生成 Token 字符串
            const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: '10h', // token 有效期为 10 个小时
            })

            res.send({
              status: 0,
              success:true,
              message: '登录成功！',
              // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
              token: 'Bearer ' + tokenStr,
            })
    })


  }