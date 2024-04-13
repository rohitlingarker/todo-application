"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// const env = process.env.NODE_ENV || "production";
// const config = require(__dirname + "/../config/config.json")[env];
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (process.env.NODE_ENV == "test") {
  // console.log("5555555555555",config);
  sequelize = new Sequelize("postgres://blnzaehi:QfO9R4EGtVmVxNOB3pwu3w7WS4WrRqQT@satao.db.elephantsql.com/blnzaehi", config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;