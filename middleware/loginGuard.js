//判断用户登录状态，登录即放行，没有登录转到登录页
const guard = (req,res,next) => {
    if(req.url != '/login' && !req.session.username) {
        console.log('未登录')
        res.redirect('/admin/login');
    }else{
        if (req.session.role == 'normal') {
            // 让它跳转到博客首页 阻止程序向下执行
            return res.redirect('/home/')
        }
        next();
    }
}
module.exports = guard;
