require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 5100,
    DB_URL: process.env.DB_URL
}