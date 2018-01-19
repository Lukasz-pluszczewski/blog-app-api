import { Router as router } from 'express';
import { name, version, author } from '../../package.json';
import AuthenticationMiddleware from 'middleware/AuthenticationMiddleware';
import posts from './posts';
import config from './config';

export default ({ RequireAuthentication }) => {
  const api = router();

  api.use('/posts', posts({ RequireAuthentication }));
  api.use('/config', config({ RequireAuthentication }));
  api.use('/login', AuthenticationMiddleware.authorizationRoutes(api));

  // api data
  api.get('/health', (req, res) => {
    res.json({
      status: 'Healthy',
      name,
      appVersion: version,
      apiVersion: 1,
      apiVersions: [
        'v1',
      ],
      author,
    });
  });

  return api;
};
