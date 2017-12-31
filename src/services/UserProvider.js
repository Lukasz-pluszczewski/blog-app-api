import _ from 'lodash';
import NotFoundError from 'errors/NotFoundError';
import AuthorizationError from 'errors/AuthorizationError';
import crud from 'services/resourceCrud';
import PasswordService from 'services/PasswordService';
import config from '../constants/config';

const createUserProvider = ({ config }) => ({
  findUser(params) {
    return new Promise(resolve => {
      const user = crud.get('users', users => users.find(params));
      if (user) {
        return resolve(user);
      }
      throw new NotFoundError({ verboseMessage: 'User not found' });
    });
  },
  verifyUser(username, password) {
    return this.findUser({ username })
      .then(user => {
        if (PasswordService.verify(password, user.password)) {
          return Promise.resolve(_.pick(user, ['username', 'name']));
        }
        throw new Error('User and password do not match');
      })
      .catch(error => {
        throw new AuthorizationError({ verboseMessage: 'User and password do not match' }, error);
      });
  },
});

export default createUserProvider({ config });
