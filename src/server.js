import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import glob from 'glob';
import flattenDeep from 'lodash.flattendeep';
import dotenv from 'dotenv';

import pack from '../package.json';

dotenv.config();

const server = new Hapi.Server({
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
    },
  },
});

export async function initializeServer() {
  /* Swagger Options */
  const swaggerOptions = {
    info: {
      title: 'Ghana Open Data',
      version: pack.version,
      contact: {
        name: 'David Oddoye',
        email: 'oddoyedavid@gmail.com',
      },
    },
    auth: false,
    basePath: '/api',
    pathPrefixSize: 2,
    host: process.env.API_HOST,
  };
  /**
   * Register Swagger Plugin
   */
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  const files = glob.sync('./libs/**/*.routes.js', { cwd: __dirname });

  const routes = files.map(file => require(file).default); // eslint-disable-line
  server.route(flattenDeep(routes));

  return server;
}

export default server;
