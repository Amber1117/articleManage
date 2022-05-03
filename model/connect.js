const mongoose = require('mongoose');
//引入config
const config = require('config');
//连接数据库
mongoose.connect(`mongodb://${config.get('db.host')}/${config.get('db.name')}`)
.then(() => console.log("数据库连接成功"))
.catch(() => console.log("数据库连接失败"))
