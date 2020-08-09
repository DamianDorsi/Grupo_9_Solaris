module.exports={
    quienesSomos:function(req, res, next) {
        res.render('quienesSomos', { title: 'Nosotros' });
      },
    sucursales:function(req, res, next) {
        res.render('sucursales', { title: 'Sucursales' });
      },
    contacto:function(req, res, next) {
        res.render('contacto', { title: 'Contacto' });
      },
      index:function(req, res, next) {
        res.render('index', { title: 'Solaris' });
      },     
}