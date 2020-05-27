// --------------- 加载所需模块 ---------------
const path = require('path')
const express = require('express')
// 加载express-jwt 模块 用于解密 token字符串
const jwt = require('express-jwt')
const cors = require('cors')

// --------------- 开启服务并指定端口 ---------------
const app = express()
app.listen(3007, () => console.log('Big-Event Server Is Running...'))

// --------------- 配置应用级别中间件 ---------------
app.use(cors()) // 解决跨域问题
app.use(express.urlencoded({
    extended: false
})) // 接收post请求体

// 解析token字符串, 控制哪些接口必须登录才能访问
// app.use(jwt({ secret: 'shhhhhhared-secret'}).unless({path: ['/token']}));
// 把用户保存的数据, 放到 req.user 的变量上
app.use(jwt({
    secret: 'bigevent'
}).unless({
    path: /^\/api/
}))

// --------------- 加载路由器模块 ---------------
app.use('/api', require(path.join(__dirname, 'routers', 'login')))
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')))
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')))
app.use('/my', require(path.join(__dirname, 'routers', 'user')))


// 错误处理中间件
// 错误处理中间件, 必须是4个参数
app.use(function (err, req, res, next) {
    // console.log(err.name) // 错误的名字     UnauthorizedError
    // console.log(err.message) // 错误的提示  No authorization token was found
    if (err.name === 'UnauthorizedError') {
        // 如果错误的名字是 UnauthorizedError, 则表示是token相关的错误
        console.log(err.message)
        res.status(401).send({
            status: 1,
            message: '身份认证失败！'
        });
    }
})