const ArticleCart  = require("../models/article-schema")
const { UsersAuthSchema } = require("../models/user-schema")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

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
    console.info('Save data successfull in database')

    res.status(201).json({
      result: true,
      errors: false,
      savedArticle: newArticle
    })

  } catch (error) {
    console.log(error)
  }

}

exports.getAllProductsCart = async (req, res) => {
  try {
    const dataFromDB = await ArticleCart.find({})
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
    console.log(userFromDB)

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
  console.log(req.params.token)
  const decoded = jwt.verify(req.params.token, config.KEY_JWT)
  

  res.json({
    dataUser: {
      email: decoded.email,
      username: decoded.username,
      id: decoded.id
    },
    isAuthenticated: true
  })
}) 