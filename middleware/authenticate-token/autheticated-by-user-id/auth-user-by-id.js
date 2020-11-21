const { getUserByIDUsersSchema } = require("../../../models/user-schema")

exports.authUserById = async (req, res, next) => {
  const result = await getUserByIDUsersSchema(req.body.userID)
  result
    ? next()
    : res.sendStatus(401)
}