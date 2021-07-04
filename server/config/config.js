
module.exports = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // In docker, it should be mysql, https://stackoverflow.com/questions/53988649/docker-sequelizeconnectionrefusederror-connect-econnrefused-127-0-0-13306
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
    port: process.env.MYSQL_PORT,
    operatorsAliases: false
}