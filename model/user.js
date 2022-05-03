const mongoose = require('mongoose');
//导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');
//创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email: {
        type:String,
        required:true,
        unique:true,   //保证不重复
    },
    password: {
        type:String,
        required:true
    },
    //用户身份
    role: {
        type:String,
        required:true,
    },
    //禁用状态
    state: {
        type:Number,
        default:0
    }
})

//创建集合
const User = mongoose.model('User',userSchema);
//对用户密码进行加密,插入用户数据
async function createUser() {
    // 生成随机字符串 gen => generate 生成 salt 盐
    const salt = await bcrypt.genSalt(10);
    // 使用随机字符串对密码进行加密
    let pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username:'wp',
        email:'wp123wp@qq.com',
        password:pass,
        role:'admin',
        state:0
    })

}
// createUser();
//验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    // 实施验证
    return Joi.validate(user, schema);
}
//导出集合
module.exports = {
    User,
    validateUser
};
