const { config } = require('dotenv')
config();

module.exports = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databse: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    }
}