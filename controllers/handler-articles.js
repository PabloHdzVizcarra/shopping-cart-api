const ArticleCart  = require("../models/article-schema")

exports.getAllArticles = (req, res) => {
  res.send('Get data from database')
}

exports.addProductCart = async (req, res) => {
  console.log(req.body);

  const newArticle = new ArticleCart({
    name: req.body.name,
    price: req.body.price
  })
  console.log(newArticle)
  
  try {
    await newArticle.save()
    console.info('Save data successfull')

    res.json({
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
      res.status().json({
        message: "No item found"
      })
      return 
    }

     res.json({
      message: "deleted element"
    })

  } catch (error) {
    res.status(500).send(error)
  }
}