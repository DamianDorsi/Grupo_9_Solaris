const dbProduct = require("../data/database")


module.exports={
    listar:function(req, res, next) {
      res.render('Productos', { title: 'productos' });
      },
    agregar:function(req, res, next) {
        res.render('agregarProductos', { title: 'Agregar Producto' });
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
    detalle:function(req,res){
        let id = req.params.id;
        let producto = dbProduct.filter(producto=>{
            return producto.id == id
        })
        res.render("detalleProductos",{
            title:"Detalle del producto",
            producto:producto[0]
        })
}
}