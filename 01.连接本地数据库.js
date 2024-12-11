//导入mysql模块
const mysql =   require('mysql2')
//建立连接
const db = mysql.createPool({
    host: 'localhost',   //数据库的IP地址
    user: 'root',          //登录数据库的账号
    password: 'admin123', //登录数据库的密码
    database: 'myData',   //制定要操作哪一个数据库

})
// 测试是否连接成功
// const  sqlstr = 'SELECT * FROM users'
// db.query(sqlstr,(err,res)=>{ 
//     //查询失败
//     if(err) return console.error(err.message)
//     //查询成功，打印出查询结果
//      console.log(res)
// })

// //1.要插入的数据
// const user = {userName:'LIlI',password:'czz1234'}
// //2.执行的sql语句  其中 ? 表示占位符
// const sqlstr = 'INSERT INTO users (userName,password) VALUES ( ?,?)'

// //3.使用数组的形式，依次为? 占位符指定具体的值
// db.query(sqlstr,[user.userName,user.password],(err,res)=>{ 
//     //插入失败
//     if(err) return console.error(err.message)
//     //插入成功，打印出插入的ID
//   if(res.affectedRows === 1){console.log('插入数据成功')}
// })



// //1.要插入的数据
// const user = {userName:'bobo',password:'bobo1234'}
// //2.执行的sql语句  其中 ? 表示占位符
// const sqlstr = 'INSERT INTO users SET ?'

// //3.使用数组的形式，依次为? 占位符指定具体的值
// db.query(sqlstr,user,(err,res)=>{ 
//     //插入失败
//     if(err) return console.error(err.message)
//     //插入成功，打印出插入的ID
//   if(res.affectedRows === 1){console.log('插入数据成功')}
// })


// //1.要更新的数据
// const user = {id:2, userName:'二狗',password:'gg1234'}
// //2.执行的sql语句 
// const sqlstr = 'UPDATE users SET  userName=?,password=? WHERE id=?'
// //3.使用数组的形式，依次为? 占位符指定具体的值
// db.query(sqlstr,[user.userName, user.password ,user.id],(err,res)=>{ 
//     //更新失败
//     if(err) return console.error(err.message)
//     //更新成功
//   if(res.affectedRows === 1){console.log('更新数据成功')}
// })


// //1.要更新的数据
// const user = {id:6, userName:'三三',password:'33333'}
// //2.执行的sql语句 
// const sqlstr = 'UPDATE users SET ? WHERE id=?'
// //3.使用数组的形式，依次为? 占位符指定具体的值
// db.query(sqlstr,[user,user.id],(err,res)=>{ 
//     //更新失败
//     if(err) return console.error(err.message)
//     //更新成功
//      if(res.affectedRows === 1){console.log('更新数据成功')}
// })



//1.执行的sql语句 
const sqlstr = 'DELETE FROM users  WHERE id=?'
//2.注意:如果SQL语句中有多个占位符，则必须用数组为每个占位符指定具体的值
//       如果SQL语句中只有一个占位符，则可以省略
db.query(sqlstr,7,(err,res)=>{ 
    //删除失败
    if(err) return console.error(err.message)
    //删除成功
     if(res.affectedRows === 1){console.log('删除成功')}
})

