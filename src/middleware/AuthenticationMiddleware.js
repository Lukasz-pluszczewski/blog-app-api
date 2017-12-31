import AuthorizationError from 'errors/AuthorizationError';
import AuthenticationError from 'errors/AuthenticationError';
import BadRequestError from 'errors/BadRequestError';

import AuthService from 'services/AuthService';
import UserProvider from 'services/UserProvider';
import config from '../constants/config';

const AuthenticationMiddleware = {

  /**
   * Middleware that blocks request if it is not properly authenticated
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @return {void}
   */
  requireAuthentication(req, res, next) {
    if (!req.headers[config.authentication.authHeader]) {
      return res.status(401).send({
        message: config.errors.authentication.noAuthHeader,
        details: { expectedHeaderName: config.authentication.authHeader, actualHeaders: req.headers },
      });
    }

    // verifying auth header and sending error response if not correct
    AuthService.verifyJWT(req.headers[config.authentication.authHeader])
      .then(payload => UserProvider.findUser(payload.user))
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        if (error.code === 404) {
          throw new AuthenticationError(null, error);
        }
        next(error);
      });
  },

  /**
   * Middleware that blocks request if it is not properly authenticated
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @return {void}
   */
  authenticate(req, res, next) {
    if (req.headers[config.authentication.authHeader]) {
      // verifying auth header and sending error response if not correct
      AuthService.verifyJWT(req.headers[config.authentication.authHeader])
        .then(payload => UserProvider.findUser(payload.user))
        .then(user => {
          req.user = user;
          next();
        });
    } else {
      next();
    }
  },

  /**
   * Middleware that adds authorization routes
   * @param {Router} router
   * @return {Router} router
   */
  authorizationRoutes(router) {
    router.post('/', (req, res, next) => {
      if (!req.body.username || !req.body.password) {
        next(new BadRequestError({ verboseMessage: 'No user or password provided' }));
      }

      // verifying if user exists and sending token if so
      UserProvider.verifyUser(req.body.username, req.body.password)
        .then(user => AuthService.generateJWT({ user }))
        .then(data => res.json({ token: data.token }))
        .catch(error => next(error));
    });
    router.get('/', this.requireAuthentication, (req, res, next) => {
      return AuthService.generateJWT({ user: req.user })
        .then(data => res.json({ token: data.token }))
        .catch(error => next(error));
    });
    return router;
  },
};

export default AuthenticationMiddleware;
