const Sequelize = require('sequelize')

const config = {
    database: 'ccd',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
        timestamps: false
    }
})

module.exports = {
    sequelize
}