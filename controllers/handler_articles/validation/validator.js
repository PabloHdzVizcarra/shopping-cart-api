const { body, validationResult } = require('express-validator')
const LOG = require('debug')('app')

const articleValidationRules = () => {
  return [
    body('admin', 'debes estar logueado como andministrador').isString(),
    body('image', 'La url de la imagen debe ser valida').isURL(),
    body('category', 'Debes proporcionar una categoria valida')
      .isString()
      .isLength({ min: 1 }),
    body('name', 'El nombre de articulo debe ser valido')
      .isString()
      .isLength({ min: 3 }),
    body('price', 'El precio que ingresaste no es valido')
      .isNumeric()
      .not()
      .isEmpty(),
    body('description', 'La descripcion del producto no esta definida')
      .isString()
      .not()
      .isEmpty()
      .isLength({ min: 9 }),
    body('userID', 'debes estar logueado como administrador').isString(),
  ]
}

const validateArticle = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push(err.msg))

  LOG('A data validation error ocurred')
  return res.status(404).json({
    errors: extractedErrors,
  })
}

module.exports = {
  articleValidationRules,
  validateArticle,
}
