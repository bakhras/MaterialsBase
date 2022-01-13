const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Compound = sequelize.define('compounds', {
    comp_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    comp_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "table_uq_1"
    },
    comp_material: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comp_notation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comp_mol2: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_components: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_properties: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_activities: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_overallProperties: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    comp_overallActivities: {
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
