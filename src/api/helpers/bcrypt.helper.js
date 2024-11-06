const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

const genSalt = () => {
  return bcrypt.genSaltSync(SALT_ROUND);
};

const hash = async (input) => {
  const salt = genSalt();
  if (!salt) throw new Error('An error has occurred (genSalt)');
  const hashResult = await bcrypt.hash(input.toString().trim(), salt);
  return hashResult;
};

const compare = async (data, hashed) => {
  return await bcrypt.compare(data, hashed);
};

module.exports = {
  hash,
  compare,
};
