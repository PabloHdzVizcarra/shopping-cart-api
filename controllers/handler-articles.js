const ArticleCart  = require("../models/article-schema")

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
      return 
    }

    res.status(201).json({
      idItemDeleted: id
    })

    return

  } catch (error) {
    res.status(500).send(error)
  }
}