const { getUserByIDUsersSchema } = require("../../models/user-schema")

exports.authUserById = async (req, res, next) => {
  if (!req.body.userID) return res.sendStatus(401)
  const result = await getUserByIDUsersSchema(req.body.userID)
  result
    ? next()
    : res.sendStatus(401)
}