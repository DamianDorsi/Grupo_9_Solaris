const dbProduct = require("../data/database")
const dbCategories = require('../data/dbCategories');
const fs = require('fs')
const path = require('path')

const ultimoId = function(array){
  let ultimoId
  array.forEach(elemento => {
      ultimoId = elemento.id
  })
  return ultimoId + 1
}


module.exports={
    listar:function(req, res, next) {
      res.render('listadoProductos', { 
        title: 'productos',
        productos: dbProduct
      });
      },
    formAgregar:function(req, res, next) {
        res.render('agregarProductos', { title: 'Agregar Producto' });
      },
      
    agregarProducto: (req, res, next) => {
        let productoNuevo = {
            id : ultimoId(dbProduct),
            name : req.body.name.trim(),
            price : Number(req.body.price),
            discount : Number(req.body.discount),
            category: req.body.category.trim(),
            clase: req.body.clase.trim(),
            description : req.body.description.trim(),
            image: (req.files[0])?req.files[0].filename:"default-image.png",
            destacado: req.body.destacado,
            stock: req.body.stock
        }

        dbProduct.push(productoNuevo);
        dbProductJSON = JSON.stringify(dbProduct)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json') , dbProductJSON)

        res.redirect('/productos/admin/' + productoNuevo.id)
    },

    formEditar: (req, res) => {
      let idProducto = req.params.id;
      let productoElegido = dbProduct.filter(producto =>{
          return producto.id == idProducto
      })
      res.render('editarProducto', {
        title:"Panel Admin",
        producto:productoElegido[0],
        total: dbProduct.length,
      })
  },

    editar: (req, res) => {
        dbProduct.forEach(producto => {
            if(producto.id == req.params.id){
              producto.name = req.body.name.trim(),
              producto.price = Number(req.body.price),
              producto.discount = Number(req.body.discount),
              producto.category= req.body.category.trim(),
              producto.clase= req.body.clase.trim(),
              producto.description = req.body.description.trim(),
              producto.image = (req.files[0]?req.files[0].filename:producto.image),
              producto.destacado=req.body.destacado,
              producto.stock = Number(req.body.stock)
            }
        })
        dbProductJSON = JSON.stringify(dbProduct)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json') , dbProductJSON)

        res.redirect('/productos/admin/' + req.params.id)
  },
    eliminar: (req, res) => {
      let indiceProducto;
      // RECORRO LA BD
      dbProduct.forEach(producto => {
          // BUSCO EL PRODUCTO QUE SE QUIERE ELIMINIAR
          if(producto.id == req.params.id){
              // AVERIGO EL INIDICE DEL PRODUCTO A ELIMINAR
              indiceProducto = dbProduct.indexOf(producto)
          }
      })
      // LO ELIMINO
      dbProduct.splice(indiceProducto, 1)

      productosJSON = JSON.stringify(dbProduct)

      fs.writeFileSync(path.join(__dirname, '..', 'data', 'productsDataBase.json') , productosJSON)

      res.redirect("/productos/admin/1")
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
},
        admin:function(req,res,next){
          let idProducto = req.params.id;
          let  show = req.params.show
          let productosTotales= dbProduct
          let resultado = dbProduct.filter(producto =>{
              return producto.id == idProducto
          })
              res.render("adminProductos",{
              title: "Administracion de productos",
              producto: resultado[0],
              total: dbProduct.length,
              categorias:dbCategories,
              show: show,
              productosTotales: productosTotales
          })
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
}
}