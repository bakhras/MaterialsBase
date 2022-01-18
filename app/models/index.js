const {Sequelize, DataTypes, Utils} = require("sequelize");
const process = require("../../process.js");
//createMolDatatype();
const sequelize = new Sequelize(process.DB_DATABASE, process.DB_USER, process.DB_PASS, {
	host: process.DB_HOST,
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.initmodels = require("./init-models.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);
db.compounds = require("./compounds.js")(sequelize, Sequelize);

module.exports = db;

// we use 'mol' datatype, so we have to let sequelize know this
//function createMolDatatype() {
//
//       class mol extends DataTypes.ABSTRACT {
//       	toSql() {
//       		return 'text'
//       	}
//
//       }
//
//
//       mol.prototype.key = mol.key = 'mol';
//
//       DataTypes.mol = Utils.classToInvokable(mol);
//
//       const PgTypes = DataTypes.postgres;
//
//       // mandatory: map postgres datatype name
//       DataTypes.mol.types.postgres = ['mol'];
//
//       // mandatory: create a postgres-specific child datatype with its own parse method.
//       // The parser will be dynamically mapped to the OID of 'mol'
//       PgTypes.mol = function mol() {
//       	if(!(this instanceof PgTypes.mol)) {
//       		return new PgTypes.mol();
//       	}
//       	DataTypes.mol.apply(this, arguments);
//       }
//       const util = require('util');
//       util.inherits(PgTypes.mol, DataTypes.mol);
//
//       // mandatory: create, override, or reassign a postgres-specific parser
//       PgTypes.mol.parse = DataTypes.mol.parse //|| x => x;
//;
