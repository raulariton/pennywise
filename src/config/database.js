const DataSource = require("typeorm").DataSource;
const dataSource = new DataSource({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  entities: ["src/entities/*.js"],
});

module.exports = dataSource;
