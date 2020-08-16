const dbProduct = require("../data/database")
module.exports={
    carrito:function(req, res, next) {
      let oferta = dbProduct.filter(producto =>{
        return producto.discount > 0
    })
    let novedades = dbProduct.filter(producto =>{
      return producto.destacado == true
    })
    res.render('carrito', {
        title: 'Solaris',
        oferta: oferta,
        novedades:novedades
        });
      }


}