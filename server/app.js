// 导入express
const express = require('express')
// 创建服务器的实例对象
const app = express()
// 配置cors跨域
const cors = require('cors')
app.use(cors())
// 配置解析表单数据的中间件  
//  配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({
  extended: false
}))
// 封装向客户端发送错误消息的res.cc函数
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require("express-jwt")
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({
  secret: config.jwtSecretKey
}).unless({
  path: [/^\/api\//]
}))
// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败!')
  }
  // 未知错误
  res.cc(err)
})
// 启动服务器
app.listen(8000, () => {
  console.log('http://127.0.0.1:8000 is running!');
  console.log([
    "%c",
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       永无BUG"
  ].join('\n'), 'color:red');

  console.log([
    "%c",
    "      写字楼里写字间，写字间里程序员；",
    "      程序人员写程序，又拿程序换酒钱。",
    "      酒醒只在网上坐，酒醉还来网下眠；",
    "      酒醉酒醒日复日，网上网下年复年。",
    "      但愿老死电脑间，不愿鞠躬老板前；",
    "      奔驰宝马贵者趣，公交自行程序员。",
    "      别人笑我忒疯癫，我笑自己命太贱；",
    "      不见满街漂亮妹，哪个归得程序员？",
  ].join('\n'), 'color:green')
})