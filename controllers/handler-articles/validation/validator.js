const { body, validationResult } = require('express-validator')

const articleValidationRules = () => {
  return [
    body('admin', 'debes estar logueado como andministrador')
      .isString(),
    body('image', 'La url de la imagen debe ser valida')
      .isURL(),
    body('category', 'Debes proporcionar una categoria valida')
      .isString()
      .isLength({ min: 1 }),
    body('name', 'El nombre de articulo debe ser valido')
      .isString()
      .isLength({ min: 3 }),
    body('price', 'El precio que ingresaste no es valido')
      .isNumeric()
      .not().isEmpty()
  ]
}

const validateArticle = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
  return res.status(422).json({
    errors: extractedErrors,
  })

}

module.exports = {
  articleValidationRules,
  validateArticle
}