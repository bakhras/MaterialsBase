const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      unique: "table_uq"
    },
    user_isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_contactEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_salt: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "index",
        unique: true,
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "table_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "table_uq",
        unique: true,
        fields: [
          { name: "user_name" },
        ]
      },
    ]
  });

  return User;
};
