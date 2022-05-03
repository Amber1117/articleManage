module.exports = (req,res) => {
    req.session.destroy(function(){
      //删除cookie
      res.clearCookie('connect.sid');
      //重定向到用户登录页面
        res.redirect('/admin/login');
        //清除本地用户记录
        req.app.locals.userInfo = null;
    })
}
