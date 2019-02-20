const bcrypt = require('bcrypt');

const PasswordCreate = (text, salt) => bcrypt.hashSync(text, salt);
const PasswordCompare = (text, hash) => bcrypt.compareSync(`${text}`, `${hash}`);

export {
  PasswordCreate,
  PasswordCompare,
}