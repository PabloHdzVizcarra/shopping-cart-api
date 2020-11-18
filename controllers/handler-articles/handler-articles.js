const ArticleCart  = require("../../models/article-schema")
const LOG = require('debug')('app')

exports.init = (req, res) => {
  res.json({message: 'Ready'})
}

exports.addProductCart = async (req, res) => {

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: true,
      message: "Enviaste algunos datos invalidos"
    })
  }
  
  try {
    const newArticle = new ArticleCart({
      name: req.body.name,
      price: req.body.price,
      category: 'General',
      image: req.body.image
    })

    await newArticle.save()
    LOG('Guardaste un objeto con exito en la DB')

    return res.status(201).json({
      result: true,
      errors: false,
      savedArticle: newArticle
    })

  } catch (error) {
    LOG(error)
    return res.status(400)
  }

}

exports.getAllProductsCart = async (req, res) => {

  try {
    const dataFromDB = await ArticleCart.find({})
    LOG('Se obtienen todos los productos de la DB')
    res.json(dataFromDB)
    
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error
    })
  }
}

exports.deleteOneProductById = async (req, res) => {
  const { id } = req.body
  
  try {
    const deleteElement = await ArticleCart.findByIdAndDelete(id)
    if (!deleteElement) {
      res.status(404).json({
        message: "No item found"
      }) 
    }

    LOG('Se elimina un producto con exito de la DB')
    res.status(201).json({
      idItemDeleted: id
    })

  } catch (error) {
    res.status(500).send(error)
  }
}

exports.getAllArticles = async (req, res) => {
  LOG(req.user)
  res.send('testando')
}