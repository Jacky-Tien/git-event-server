// --------------- 加载所需模块 ---------------
const path = require('path')
const express = require('express')
const cors = require('cors')

// --------------- 开启服务并指定端口 ---------------
const app = express()
app.listen(3007, () => console.log('Big-Event Server Is Running...'))

// --------------- 配置应用级别中间件 ---------------
app.use(cors()) // 解决跨域问题
app.use(express.urlencoded({
    extended: false
})) // 接收post请求体

// --------------- 加载路由器模块 ---------------
app.use('/api', require(path.join(__dirname, 'routers', 'login')))
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')))
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')))
app.use('/my', require(path.join(__dirname, 'routers', 'user')))