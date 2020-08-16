const dbProduct = require("../data/database")

module.exports={
    index:function(req, res, next) {
      let oferta = dbProduct.filter(producto =>{
          return producto.discount > 0
      })
      let novedades = dbProduct.filter(producto =>{
        return producto.destacado == true
      })
      res.render('index', {
          title: 'Solaris',
          oferta: oferta,
          novedades:novedades
          });
  },
    quienesSomos:function(req, res, next) {
        res.render('quienesSomos', { title: 'Nosotros' });
      },
    sucursales:function(req, res, next) {
        res.render('sucursales', { title: 'Sucursales' });
      },
    contacto:function(req, res, next) {
        res.render('contacto', { title: 'Contacto' });
      },
    search:function(req,res){
        let buscar = req.query.search;
        let productos=[];
        dbProduct.forEach(producto => {
            if(producto.name.toLowerCase().includes(buscar.toLowerCase()))
            productos.push(producto)
        });
        res.render("productos",{
            title:"Resultado de la busqueda",
            buscar:buscar,
            producto:productos
        })
    }
    
}