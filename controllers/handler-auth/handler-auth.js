const { UsersAuthSchema } = require('../../models/user-schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const { AdminUsersSchema } = require('../../models/admin-users-schema')
const { createNewArticleUsingSchema } = require('../../models/article-schema')
const LOG = require('debug')('app')

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFromDB = await UsersAuthSchema.findOne({ email: email })

    if (!userFromDB) {
      return res.status(400).send({
        error: true,
        message: 'No existe ningun usuario con ese email',
      })
    }

    if (!bcrypt.compareSync(password, userFromDB.password)) {
      return res.status(400).send({ message: 'The password is invalid' })
    }

    const token = jwt.sign(
      { email, username: userFromDB.username, id: userFromDB._id },
      config.KEY_JWT,
      { expiresIn: '1h' }
    )

    res.cookie('token', token, { httpOnly: true })

    LOG('Usuario logeado con exito')

    res.json({
      username: userFromDB.username,
      email: userFromDB.email,
      id: userFromDB._id,
    })
  } catch (error) {
    LOG('Error al loguear usuario')
    return res.send(error.message)
  }
}

exports.registerUser = async (req, res) => {
  const { email, password, username } = req.body
  const passwordHash = bcrypt.hashSync(password, 10)

  try {
    const userCreated = new UsersAuthSchema({
      email,
      password: passwordHash,
      username,
    })
    await userCreated.save()

    LOG('Se registra usuario con exito en la DB')
    res.status(201).json({
      error: false,
      dataUser: userCreated,
    })
  } catch (error) {
    res.status(400).json({
      error: true,
      type: error,
    })
  }
}

exports.verifyUser = (req, res) => {
  jwt.verify(req.cookies.token, config.KEY_JWT, async (err, decoded) => {
    if (!decoded) {
      LOG('No se encontro usuario')

      res.json({
        message: 'El token ya expiro',
      })
      return null
    }

    if (err) {
      LOG(err)
      res.json({
        err,
      })
      return null
    }

    try {
      const userFromDB = await UsersAuthSchema.findOne({ email: decoded.email })

      if (userFromDB) {
        LOG('Usuario verificado con exito ')
        res.json({
          dataUser: {
            email: decoded.email,
            username: decoded.username,
            id: decoded.id,
          },
          isAuthenticated: true,
        })

        return null
      }

      LOG('El usuario no existe')
      res.status(404).json({
        message: 'No existe ese usuario',
      })
    } catch (error) {
      LOG(error)
      res.json({ error })
    }
  })
}

/* ------------------------- /api/v1/log-admin-users ------------------------ */

exports.adminUsers = async (req, res) => {
  LOG('Log with admin user')
  const { username, password } = req.body

  try {
    const userFromDB = await AdminUsersSchema.findOne({ username })
    if (!userFromDB) {
      res.status(409).json({
        error: true,
        msg: 'No existe ese usuario',
      })
      return null
    }

    LOG(userFromDB)

    if (!bcrypt.compareSync(password, userFromDB.password)) {
      return res.status(400).send({
        error: true,
        message: 'La password que ingresaste no coincide',
      })
    }

    res.json({
      error: false,
      userData: {
        username: userFromDB.username,
        id: userFromDB._id,
        isAdmin: true,
      },
    })
  } catch (error) {
    res.status(409).json({
      error: true,
      msg: error.message,
    })
  }
}

/* ---------------------- /api/v1/admin/create-article ---------------------- */

exports.saveArticle = async (req, res) => {
  LOG('route "/api/v1/admin/create-article"')
  const result = await createNewArticleUsingSchema(req.body)

  if (result.error) {
    LOG('ERROR: An error ocurred in the database')
    return res.sendStatus(500)
  }

  LOG('SUCCESS: The data was created correctly to the database')
  return res.status(201).json({
    data: result.data,
    message: 'Se guardaron con exito los datos en la database',
  })
}

/* ----------------------- /api/v1/create-admin-users ----------------------- */

exports.createAdminUsers = async (req, res) => {
  const { passwordAdmin, dataUser } = req.body

  if (passwordAdmin !== config.PASSWORD_ADMIN) {
    res.status(401).json({
      msg: 'Ingresaste tu admin password incorrecta',
    })
  }

  const passwordHash = bcrypt.hashSync(dataUser.password, 10)
  const adminUser = {
    username: dataUser.name,
    password: passwordHash,
    isAdmin: true,
  }

  try {
    const newAdminUser = new AdminUsersSchema({ ...adminUser })
    await newAdminUser.save()

    res.json({
      msg: 'Usuario administrativo creado con exito',
    })
  } catch (error) {
    res.status(409).json({
      msg: error.message,
    })
  }
}
