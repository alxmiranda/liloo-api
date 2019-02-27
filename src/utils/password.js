const bcrypt = require('bcrypt'),
      crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = '234t432xdvdwsde³!' 

const PasswordCreate = (text, salt) => bcrypt.hashSync(text, salt);
const PasswordCompare = (text, hash) => bcrypt.compareSync(`${text}`, `${hash}`);

const Encrypt = function encrypt(text){
  
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

const Decrypt = function decrypt(text){
  
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
}


export {
  PasswordCreate,
  PasswordCompare,
  Encrypt,
  Decrypt
}