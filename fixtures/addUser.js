import crud from '../src/services/resourceCrud';
import passwordService from '../src/services/PasswordService';

const user = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};

crud.create('users', {
  ...user,
  password: passwordService.hash(user.password),
});

process.exit();
