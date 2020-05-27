// 路由文件步骤
// 1. 加载express模块
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象

const path = require('path')
const db = require(path.join(__dirname, '../utils/db.js'))
const express = require('express')
// 加载第三方加密模块
const utility = require('utility')
const router = express.Router()

// --------------- 写接口 ---------------
// 注册的接口
router.post('/reguser', async (req, res) => {
    // 接收客户端提交的数据 username和password ==> req.body
    // 对密码进行 md5加密
    // req.body.password = 加密后的值
    req.body.password = utility.md5(req.body.password)
    // 写一条insert语句, 添加入库
    let r = await db('insert into user set ?', req.body)
    // console.log(r) // 添加成功返回一个对象, 失败了返回undefined
    if (r && r.affectedRows > 0) {
        // 成功的响应
        res.send({
            status: 0,
            message: '注册成功！'
        })
    } else {
        // 失败的响应
        res.send({
            status: 1,
            message: '注册失败！'
        })
    }
})

module.exports = router