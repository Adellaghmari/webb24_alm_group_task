const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Detta är Accommodation-modellen som beskriver boenden
const Accommodation = sequelize.define("Accommodation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // ID ökar automatiskt för varje nytt boende
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha en adress
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha en stad
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha ett land
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha ett postnummer
  },
  rent: {
    type: DataTypes.FLOAT,
    allowNull: false, // Måste ha en hyra
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false, // Måste ha ett antal rum
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Kan vara tom
  }
});

module.exports = Accommodation; 