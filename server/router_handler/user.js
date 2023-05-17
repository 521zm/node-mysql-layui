const db = require('../db/index')
// 导入bcryptjs 密码加密
const bcrypt = require('bcryptjs')
// 导入生成Token的包
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')
// 注册新用户的处理函数
exports.reguser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
    // console.log(userinfo);
    // 判断数据是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     // return res.send({
    //     //     status: 1,
    //     //     message: '用户名或密码不能为空！'
    //     // })
    //     return res.cc(err)
    // }
    // const queryStr = 'select * from ev_users where username=?'
    // db.query(queryStr, [userinfo.username],(err, result) => {
    //     if (err) return console.log(err.message);
    //     console.log(result);
    // })
    // 查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err, result) => {
        // 执行 SQL 语句失败
        if (err) return console.log(err.message);
        console.log(result);
        // console.log(result.length);
        // 用户名被占用
        if (result.length > 0) {
            // return res.send({
            //     status: 1,
            //     message: '用户名被占用，请更换其他用户名！'
            // });
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        console.log(userinfo); //未加密密码
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo); //加密密码
        //定义插入新用户的SQL语句
        const insertSql = 'insert into ev_users set ?'
        db.query(insertSql, {
            username: userinfo.username,
            password: userinfo.password
        }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                // return res.send({
                //     status: 1,
                //     message: '注册用户失败，请稍后再试！'
                // })
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.send({
                status: 0,
                message: '注册成功！'
            })
        })
    })
    // res.send('reguser OK')
}
// 登录用户的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from ev_users where username=?`
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败！')
        // TODO：判断用户输入的登录密码是否和数据库中的密码一致
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        // console.log(results[0].password);
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // console.log(userinfo.password, results[0].password);
        // console.log(!compareResult);
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        // res.send('登陆成功!')
        // 生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = {
            ...results[0],
            password: '',
            user_pic: ''
        }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // token 有效期为 {{setting}} 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}