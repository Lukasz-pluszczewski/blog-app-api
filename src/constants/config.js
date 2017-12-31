const config = {
  port: process.env.PORT || 8080,
  defaultRelativeAppsPath: 'apps',
  bodyLimit: '100kb',
  corsHeaders: ['Link', 'Jwt'],
  authentication: {
    JWTSecret: 'u&ydg%4$dNC#@kd8r',
    issuer: 'Bardziej.pro',
    audience: 'Bardziej.pro',
    tokenExpiration: 86400,
    algorithms: ['HS256'],
    authHeader: 'jwt',
  },
  passwordsHashing: {
    algorithm: 'sha1',
    saltLength: 8,
  },
  db: {
    fileName: 'db.json',
  },
  debugger: {
    enable: true,
    auth: true,
    requests: true,
    hosts: true,
  },
  errors: {
    notFound: 'Not found',
    authentication: {
      noAuthHeader: 'Authentication header not provided',
      unauthenticated: 'User not found',
    },
  },
};

export default config;
