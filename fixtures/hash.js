import passwordService from '../src/services/PasswordService';

const argv = require('minimist')(process.argv.slice(2))

argv._.forEach(pass => console.log(pass, passwordService.hash(pass)));

if (!argv._.length) {
  console.log('No passwords to hash. Example: "npm run hash myPassword"');
}

process.exit();
