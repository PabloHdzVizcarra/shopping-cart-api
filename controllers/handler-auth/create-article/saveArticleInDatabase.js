const ArticleSchema = require("../../../models/article-schema")

exports.saveArticleInDatabase = async (data) => {
  try {
    const newArticle = new ArticleSchema({ ...data })
    await newArticle.save()
    
    return ({
      error: false,
      message: 'Articulo guardado con exito',
      data: newArticle
    })
    
  } catch (error) {
    return ({
      error: true,
      message: error.message
    })
  }

}
