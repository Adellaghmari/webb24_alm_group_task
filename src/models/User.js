const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// User-modellen som beskriver användare i systemet
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // ID ökar automatiskt för varje ny användare
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha ett användarnamn
    unique: true, // Användarnamn måste vara unikt
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Måste ha en e-post
    unique: true, // E-post måste vara unik
    validate: {
      isEmail: true, // Validerar att e-posten har rätt format
    },
  },
  profileImage: {
    type: DataTypes.STRING, // URL till profilbild
    allowNull: true, // Kan vara tom, alla användare behöver inte ha profilbild
    validate: {
      isUrl: true, // Validerar att det är en giltig URL
    },
  },
});

module.exports = User;
