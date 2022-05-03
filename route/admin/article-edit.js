const {Article} = require('../../model/article')
module.exports = async (req,res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    const {id} = req.query;
    if(id) {
        //修改操作
        //根据id查询文章信息
        let article = await Article.findOne({_id:id});
        console.log(article.publishDate.toString().substring(0,9));
        res.render('admin/article-edit',{
            id:id,
            article:article
        });
    }else{
        //添加操作
        //显示编辑页面
        res.render('admin/article-edit');
    }
}
