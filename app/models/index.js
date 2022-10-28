const smi = require('smiles');
const {Sequelize, DataTypes, Utils, } = require("sequelize");
const process = require("../../process.js");

// we use 'mol' datatype, so we have to let sequelize know this
function createMolDatatype() {
	class mol extends DataTypes.TEXT {
		static key = 'mol';

		constructor() {
			super();
			this.key = 'mol';
		}

		toSql() {
			return 'mol';
		}

		validate = (value) => {
			return (smiles.parse(value) !== 'null')
		}

	}

	DataTypes.mol = Sequelize.Utils.classToInvokable(mol);
	DataTypes.mol.prototype.key = 'mol';
	DataTypes.mol.key = DataTypes.mol.prototype.key;
	Sequelize.mol = Sequelize.Utils.classToInvokable(DataTypes.mol);
	DataTypes.mol.types.postgres = ['mol'];

	let PgTypes = DataTypes.postgres;
	// mandatory: create a postgres-specific child datatype with its own parse method.
	// The parser will be dynamically mapped to the OID of 'mol'
	PgTypes.mol = function mol() {
		if(!(this instanceof PgTypes.mol)) {
			return new PgTypes.mol();
		}
		DataTypes.mol.apply(this, arguments);
	}

	const util = require('util');
	util.inherits(PgTypes.mol, DataTypes.mol);
	PgTypes.mol = DataTypes.mol;
	PgTypes.mol.types = {postgres:['mol']};

	DataTypes.postgres.mol.key = 'mol';
};

createMolDatatype();

const sequelize = new Sequelize(process.DB_DATABASE, process.DB_USER, process.DB_PASS, {
	host: process.DB_HOST,
	dialect: 'postgres',
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
