import Joi from 'joi';
import { validators } from './district.model';
import DistrictService from './district.service';
import { paginationQueryParams, entityId } from '../../utils/validators';

export default [
  {
    method: 'GET',
    path: '/api/districts',
    config: {
      auth: false,
      handler: async (request) => {
        const { limit, page, populateRegion } = request.query;
        return DistrictService.list({ limit, page, populate: populateRegion ? ['region'] : [] });
      },
      description: 'get districts',
      notes: 'This endpoint allows for the retrieval of all districts.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(validators.district),
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        query: paginationQueryParams({
          populateRegion: Joi.bool().default(false),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/districts/{id}',
    config: {
      auth: false,
      handler: async (request) => {
        const { id } = request.params;
        const { populateRegion } = request.query;

        return DistrictService.findById(id, populateRegion ? ['region'] : []);
      },
      description: 'get district',
      notes: 'This endpoint allows for the retrieval of a specific district by id.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: validators.district,
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        params: entityId,
        query: Joi.object({
          populateRegion: Joi.bool().default(false),
        }),
      },
    },
  },
];
