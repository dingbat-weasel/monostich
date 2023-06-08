//test
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashedPw = await bcrypt.hash(password, 10);
  return hashedPw;
};

module.exports = hashPassword;
