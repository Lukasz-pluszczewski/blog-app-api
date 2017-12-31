import passwordHash from 'password-hash';
import config from '../constants/config';

const options = {
  algorithm: config.passwordsHashing.algorithm,
  saltLength: config.passwordsHashing.saltLength,
};

const passwordService = {
  /**
   * Gets non hashed password and returns it's hash
   * @param {string} password
   * @return {string} hashed password
   */
  hash(password) {
    return passwordHash.generate(password, options);
  },

  /**
   * Verifies if password matches hashedPassword
   * @param {string} password
   * @param {string} hashedPassword
   * @return {boolean} isMatching
   */
  verify(password, hashedPassword) {
    return passwordHash.verify(password, hashedPassword);
  },

  /**
   * Verifies if password is already hashed
   * @param {string} password
   * @return {boolean} isHashed
   */
  isHashed(password) {
    return passwordHash.isHashed(password);
  },
};

export default passwordService;
