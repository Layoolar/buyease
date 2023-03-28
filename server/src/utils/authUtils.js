const bcrypt = require('bcrypt');
const User = require('../models/user');

async function hashPassword(password) {
  const saltRounds = 13;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword

}
module.exports = {
  hashPassword,
};
