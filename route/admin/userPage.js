const { User } = require('../../model/user')
module.exports = async (req,res) => {
    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';
    //接受客户端传递的当前页参数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 2;
    // 查询用户数据的总数
    let count = await User.countDocuments({});
    console.log("count",count);
    //查询用户总数
    let total = Math.ceil(count / pagesize);
    //页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;
    //将用户信息从数据库中查询
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render('admin/user',{
        users: users,
        count:count,
        page: page,
        total: total
    })
}
