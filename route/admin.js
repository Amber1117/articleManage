//引入express
const express = require('express');
//创建路由
const admin = express.Router();
//home页的路由
admin.get('/index',(req,res) => {
    res.send('管理')
})
// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

//实现退出功能
admin.get('/logout',require('./admin/logout'));

//用户列表路由
admin.get('/user',require('./admin/userPage'));

//用户修改/添加信息页面
admin.get('/user-edit',require('./admin/user-edit'));

//用户添加功能
admin.post('/user-edit',require('./admin/user-edit-fn'));

// 用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

// 用户删除功能路由
admin.get('/delete', require('./admin/user-delete'));

//文章列表页面路由
admin.get('/article',require('./admin/article'));

//文章编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'));

//文章发布路由页面
admin.post('/article-add',require('./admin/article-add'))
module.exports = admin;
