import Joi from 'joi';
import { validators } from './region.model';
import RegionService from './region.service';
import { paginationQueryParams, response, entityId } from '../../utils/validators';

export default [
  {
    method: 'GET',
    path: '/api/regions',
    config: {
      auth: false,
      handler: async (request) => {
        const { limit, page } = request.query;
        return RegionService.list(limit, page);
      },
      description: 'get regions',
      notes: 'This endpoint allows for the retrieval of all regions.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: response(Joi.array().items(validators.region)),
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        query: paginationQueryParams,
      },
    },
  },
  {
    method: 'GET',
    path: '/api/regions/{id}',
    config: {
      auth: false,
      handler: async (request) => {
        const { id } = request.params;
        return RegionService.findById(id);
      },
      description: 'get regions',
      notes: 'This endpoint allows for the retrieval of a specific region by id.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: response(validators.region),
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        params: entityId,
      },
    },
  },
];
