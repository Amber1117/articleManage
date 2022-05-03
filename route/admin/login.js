const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async (req,res) => {
    //获取表单参数
    const { email,password } = req.body;
    //后端再次验证是否为空
   if(email.trim().length == 0 || password.trim().length == 0)
       return res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
    //若不为空，则根据邮箱查询用户信息
    let user = await User.findOne({email});
    //若能查到用户
    if(user) {
        //比对密码
        let isValid = await bcrypt.compare(password, user.password);
        //密码成功
        if(isValid) {
            //将用户信息保存进session中
            req.session.username = user.username;
            req.session.role = user.role;
            //将用户信息注入到全局
            req.app.locals.userInfo = user;
            if(user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 重定向到博客首页
                res.redirect('/home/');
            }

        }else {
            //密码失败
            res.status(400).render('admin/error',{msg:'邮箱地址或密码错误'})
        }
    }else{
        //查询不到用户
        res.status(400).render('admin/error',{msg:'邮箱地址或密码错误'})
    }

}
