const ArticleCart  = require("../models/article-schema")
const { UsersAuthSchema } = require("../models/user-schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const LOG = require('debug')('app')

exports.getAllArticles = (req, res) => {
  res.json({message: 'Ready'})
}

exports.addProductCart = async (req, res) => {

  const newArticle = new ArticleCart({
    name: req.body.name,
    price: req.body.price
  })
  
  try {
    await newArticle.save()
    LOG('Guardaste un objeto con exito en la DB')

    res.status(201).json({
      result: true,
      errors: false,
      savedArticle: newArticle
    })

  } catch (error) {
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

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  
  try {
    const userFromDB = await UsersAuthSchema.findOne({ email: email })

    if (!userFromDB) {
      return res.status(400).send({message: "No existe ningun usuario con ese email"})
    }

    if (!bcrypt.compareSync(password, userFromDB.password)) {
      return res.status(400).send({message: "The password is invalid"})
    }

    const token = jwt.sign(
      { email, username: userFromDB.username, id: userFromDB._id},
      config.KEY_JWT,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, { httpOnly: true })
    
    LOG('Usuario logeado con exito')
    
    res.json({
      dataUser: userFromDB,
      token: token
    })

  } catch (error) {
    return res.send(error.message)
  } 

}
  


exports.registerUser = async(req, res) => {
  const { email, password, username } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)
  
  try {
    const userCreated = new UsersAuthSchema({
      email, password: passwordHash, username
    })
    await userCreated.save()

    LOG('Se registra usuario con exito en la DB')
    res.status(201).json({
      error: false,
      dataUser: userCreated
    })

  } catch (error) {
     res.status(400).json({
      error: true,
      type: error
    })
  }
}

exports.verifyUser = ((req, res) => {
  jwt.verify(req.params.token, config.KEY_JWT, (err, decoded) => {

    if (!decoded) {
      LOG("No se encontro usuario")

      return res.json({
        message: "El token ya expiro"
      })
    }
    
    if (err) {
      LOG(err)
    }

    LOG('Usuario verificado con exito ')
    res.json({
      dataUser: {
        email: decoded.email,
        username: decoded.username,
        id: decoded.id
      },
      isAuthenticated: true
    })


  })
  
}) 