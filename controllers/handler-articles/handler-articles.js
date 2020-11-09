const ArticleCart  = require("../../models/article-schema")
const { UsersAuthSchema } = require("../../models/user-schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const LOG = require('debug')('app')

exports.init = (req, res) => {
  res.json({message: 'Ready'})
}

exports.addProductCart = async (req, res) => {

  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      error: true,
      message: "Enviaste algunos datos invalidos"
    })
  }
  
  try {
    const newArticle = new ArticleCart({
      name: req.body.name,
      price: req.body.price
    })

    await newArticle.save()
    LOG('Guardaste un objeto con exito en la DB')

    res.status(201).json({
      result: true,
      errors: false,
      savedArticle: newArticle
    })

  } catch (error) {
    res.status(400)
    LOG(error)
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