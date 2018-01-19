import { Router } from 'express';
import _ from 'lodash';
import getDb from 'services/DbService';
import AuthenticationMiddleware from 'middleware/AuthenticationMiddleware';

export default ({ RequireAuthentication }) => {
  const router = new Router();
  return router
    .get('/', AuthenticationMiddleware.authenticate, (req, res) => {
      const db = getDb();
      const config = db.get('config').value();
      return res.status(200).json(config || {});
    })
    .patch('/', AuthenticationMiddleware.authenticate, (req, res) => {
      const db = getDb();
      let dbValue = db.get('config');
      _.forEach(req.body, (value, key) => dbValue = dbValue.set(key, value));
      dbValue.write();

      return res.status(200).json(dbValue);
    })
    .put('/', AuthenticationMiddleware.authenticate, (req, res) => {
      const db = getDb();
      const dbValue = db.set('config', req.body).write();

      return res.status(200).json(dbValue);
    });
};
