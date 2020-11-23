const { getUserByIDUsersSchema } = require('../../models/user-schema')

exports.authUserById = async (req, res, next) => {
  console.log('funcion original')
  const result = await getUserByIDUsersSchema(req.body.userID)
  result ? next() : res.sendStatus(401)
}
