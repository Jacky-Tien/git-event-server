// 路由文件步骤
// 1. 加载express模块
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象

const path = require('path')
const db = require(path.join(__dirname, '../utils/db.js'))
const express = require('express')

const router = express.Router()

// --------------- 写接口 ---------------
// 获取用户信息接口
router.get('/userinfo', async (req, res) => {
    // let r = await db('select * from user where id=?',)
    console.log(req.user) // { username: 'JackTien', id: 6, iat: 1590567871, exp: 1590740671 }
})

module.exports = router