const mysql =   require('mysql2')
//建立连接
const db = mysql.createPool({
    host: 'localhost',   //数据库的IP地址
    user: 'root',          //登录数据库的账号
    password: 'admin123', //登录数据库的密码
    database: 'myData',   //制定要操作哪一个数据库

})

// 向外共享 db 数据库连接对象
module.exports = db 