//引入express
const express = require('express');
// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');
// 处理路径
const path = require('path');
//引入config
const config = require('config');
// 导入art-tempate模板引擎
const template = require('art-template');
// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入dateformat第三方模块
const dateFormat = require('moment');

//处理POST请求参数
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormate变量
template.defaults.imports.moment = dateFormat;
//获取当前系统运行环境
// if (process.env.NODE_ENV == 'development') {
//     // 当前是开发环境
//     console.log('当前是开发环境')
//     // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
//     // app.use(morgan('dev'))
// } else {
//     // 当前是生产环境
//     console.log('当前是生产环境')
//     app.use(morgan('dev'))
// }
//处理静态资源
app.use(express.static(path.join(__dirname,'public')))
//引入express-session
const session = require('express-session');
//设置express-session官方文档提供的中间件
app.use(session({
    secret:'secret key',
    saveUninitialized:false,
    cookies: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))


console.log(config.get('title'))
//引入二级路由
const home = require('./route/home');
const admin = require('./route/admin');

app.use('/home',home);
app.use('/admin',require('./middleware/loginGuard'));
app.use('/admin',admin);

app.listen(80);
console.log('网站服务器启动成功');
