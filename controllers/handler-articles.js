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
    res.json({
      error: true,
      message: error
    })
  }
}