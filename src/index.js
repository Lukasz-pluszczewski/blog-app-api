import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Router as router } from 'express';

import AuthenticationMiddleware from 'middleware/AuthenticationMiddleware';
import KnownErrorsHandler from 'middleware/KnownErrorsHandler';
import UnknownErrorsHandler from 'middleware/UnknownErrorsHandler';

import config from './constants/config';
import apiV1 from 'v1';

const app = express();
app.server = http.createServer(app);

// body parser and cors middlewares
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));
app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use('/v1', AuthenticationMiddleware.authorizationRoutes(router()));

// v1 api router
app.use('/v1', apiV1({ RequireAuthentication: AuthenticationMiddleware.requireAuthentication }));

// error handling (add here all custom error handlers
app.use(KnownErrorsHandler);
app.use(UnknownErrorsHandler);

// starting actual server
app.server.listen(config.port);

// checking if server is listening on correct port
if (!app.server.address()) {
  console.error(`App started but it doesn't seem to listen on any port. Check if port ${config.port} is not already used.`);
} else {
  console.log(`Started on port ${app.server.address().port}`); // eslint-disable-line no-console
}
