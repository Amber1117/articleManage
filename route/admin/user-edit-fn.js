//validateUser用来验证用户输入信息是否符合规则
const { User,validateUser } = require('../../model/user')
// 引入加密模块
const bcrypt = require('bcrypt');
module.exports = async (req,res,next) => {
   try {
       await validateUser(req.body)
   }catch(e){
       //验证没有通过，重定向到该页面，并把错误信息作为参数传递出去
       return res.redirect(`/admin/user-edit?message=${e.message}`)
   }

   //若通过验证，还要检查添加的用户是否是已经存在的数据
    let user = await User.findOne({email:req.body.email});
   if(user) {
       //如果已经存在了，则重定向到用户添加页面
       return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
   }else{
       //如果用户不存在，则将数据添加进数据库
       //对数据进行加密
       const salt = await bcrypt.genSalt(10);
       let password = await bcrypt.hash(req.body.password,salt);
       req.body.password = password;
       await User.create(req.body);
       return res.redirect('/admin/user');
   }
}
