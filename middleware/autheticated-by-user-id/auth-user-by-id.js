const { getUserByIDUsersSchema } = require('../../models/users.schema')

exports.authUserById = async (req, res, next) => {
  console.log('funcion original')
  const result = await getUserByIDUsersSchema(req.body.userID)
  result ? next() : res.sendStatus(401)
}
