module.exports={
    users:function(req, res, next) {
        res.render('user', { title: 'Usuario' });
      }
}