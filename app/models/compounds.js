const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Compound = sequelize.define('compounds', {
    comp_id: { // a unique identifier for the compound randomly generated
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    comp_index: { // a unique identifier for cross-referencing with other tables
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: "table_uq_1"
    },
    comp_material: { //the human-readable name of the compound
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comp_notation: { //the chemical formula of the compound in SMILES notation
      type: DataTypes.mol,
      allowNull: false
    },
    comp_mol2: { //the 3D structure of the compound in mol2 format
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_components: { //the components of the compound in JSON format based on substructure search
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_properties: { //the properties of the compound
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compounds',
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
