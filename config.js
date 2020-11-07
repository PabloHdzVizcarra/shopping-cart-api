const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || "3000",
  DB_URL: process.env.DB_URL || "mongodb://locahost:27017/default",
  KEY_JWT: process.env.KEY_JWT || "data",
  JWT_SECRET: process.env.JWT_SECRET || 'futbol5489all'
}