const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Compound = sequelize.define('compounds', {
    comp_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    comp_index: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "table_uq_1"
    },
    comp_material: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comp_notation: {
      // TO-DO: write a datatype to accept SMILES
      //type: DataTypes.mol,
      type: DataTypes.TEXT,
      allowNull: false
    },
    comp_mol2: {
      // TO-DO: write a json parser for mol2 files
      //type: DataTypes.JSONB,
      type: DataTypes.TEXT,
      allowNull: true
    },
    comp_components: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_properties: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compounds',
    schema: 'webapp',
    timestamps: false,
    indexes: [
      {
        name: "index_1",
        unique: true,
        fields: [
          { name: "comp_index" },
        ]
      },
      {
        name: "table_pk_1",
        unique: true,
        fields: [
          { name: "comp_id" },
        ]
      },
      {
        name: "table_uq_1",
        unique: true,
        fields: [
          { name: "comp_index" },
        ]
      },
    ]
  });

  return Compound;
};
