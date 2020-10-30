const ArticleCart  = require("../models/article-schema")

exports.getAllArticles = (req, res) => {
  res.send('obteniendo los articulos')
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
    console.log('Todo bien')

    res.json({
      result: true,
      errors: false,
      savedArticle: newArticle
    })

  } catch (error) {
    console.log('Hubo un error')
    console.log(error)
  }

}