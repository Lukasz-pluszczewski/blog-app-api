import config from '../src/constants/config';
import { createAuthService } from '../src/services/AuthService';

import crud from '../src/services/resourceCrud';


createAuthService({ config: {
  ...config.authentication,
  tokenExpiration: 2419200, // ~1 month
} }).generateJWT({ user: crud.get('users', users => users.find({ name: 'admin' }), true) }).then(newToken => {
  console.log('Generated token for user: admin');
  console.log(newToken);

  process.exit();
});
