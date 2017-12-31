import _ from 'lodash';

const serializableFields = [
  'readable',
  'domain',
  'httpVersionMajor',
  'httpVersionMinor',
  'httpVersion',
  'complete',
  'headers',
  'rawHeaders',
  'trailers',
  'rawTrailers',
  'upgrade',
  'url',
  'method',
  'statusCode',
  'statusMessage',
  'baseUrl',
  'originalUrl',
  '_parsedUrl',
  'params',
  'query',
  'body',
];

export default req => _.clone(_.pick(req, serializableFields));
