const User = require('./User');
const Accommodation = require('./Accommodation');

// Skapar relation mellan User och Accommodation
User.hasMany(Accommodation, {
  foreignKey: 'userId',
  onDelete: 'CASCADE' // När en användare raderas, raderas även alla tillhörande boenden
});

Accommodation.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Accommodation
}; 