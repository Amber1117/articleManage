//引入express
const express = require('express');
//创建路由
const home = express.Router();
//home页的路由
home.get('/', require('./home/index'))
home.get('/article', require('./home/article'))
// 创建评论功能路由
home.post('/comment', require('./home/comment'));
module.exports = home;
