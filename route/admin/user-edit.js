const {User} = require('../../model/user');

module.exports = async (req,res) => {
    //获取地址栏参数
    const {message,id} = req.query;
    //如果没有参数，则为添加用户操作
    if(id){
        //根据id查询用户信息
        let user = await User.findOne({_id:id});
        res.render('admin/user-edit',{
            user:user,
            message:message,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        })
    }else{
        res.render('admin/user-edit',{
            message: message,
            link:'/admin/user-edit',
            button:'添加'
        })
    }
}
