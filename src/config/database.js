const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Laddar miljövariabler från .env-filen
dotenv.config();

let sequelize;

// Olika databasinställningar beroende på miljö
if (process.env.NODE_ENV === "test") {
  // För testkörning använder vi SQLite i minnet för att tester ska vara isolerade
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false, // Stänger av SQL-loggning
  });
} else if (process.env.NODE_ENV === "production" || process.env.USE_POSTGRES === "true") {
  // För produktion eller när USE_POSTGRES är true använder vi PostgreSQL
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, // Standard PostgreSQL-port är 5432
    logging: false, // Stänger av SQL-loggning
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? {
        require: true,
        rejectUnauthorized: false // Behövs ibland för molnbaserade databaser
      } : false
    }
  });
} else {
  // För utveckling använder vi SQLite som standard
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH || "./database.sqlite", // Använder DB_PATH från .env eller standardvärde
    logging: false, // Stänger av SQL-loggning
  });
}

// Exporterar Sequelize-instansen för att användas i modeller och annan kod
module.exports = sequelize;
