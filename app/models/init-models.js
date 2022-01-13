var DataTypes = require("sequelize").DataTypes;
var _compounds = require("./compounds");
var _users = require("./users");

function initModels(sequelize) {
  var compounds = _compounds(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    compounds,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
