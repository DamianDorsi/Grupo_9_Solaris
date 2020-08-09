module.exports={
    producto:function(req, res, next) {
        res.render('productos', { title: 'Productos' });
      },
    agregar:function(req, res, next) {
        res.render('agregarProductos', { title: 'Administracion' });
      },
    guitarras:function(req, res, next) {
        res.render('guitarras', { title: 'Guitarras' });
      },
    bajos:function(req, res, next) {
        res.render('bajos', { title: 'Bajos' });
      },
    baterias:function(req, res, next) {
        res.render('baterias', { title: 'Baterias' });
      },
    accesorios:function(req, res, next) {
        res.render('accesorios', { title: 'Accesorios' });
      },

}