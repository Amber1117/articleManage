const {User} = require('../../model/user');

module.exports = async(req,res) => {
    console.log("被删除id",req.query.id)
    await User.findOneAndDelete({_id: req.query.id});
   res.redirect('/admin/user')
}
