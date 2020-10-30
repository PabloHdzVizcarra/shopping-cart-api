const { ArticleCart } = require("../models/article-schema")

exports.getAllArticles = (req, res) => {
  res.send('obteniendo los articulos')
}

exports.addProductCart = (req, res) => {
  console.log(req.body);
  const newArticle = new ArticleCart({
    name: req.body[1],
    price: req.body[3]
  })
  
  console.log(newArticle);

  res.send({
    result: true,
    errors: false
  })
}