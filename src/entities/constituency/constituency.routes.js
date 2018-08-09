import Joi from 'joi';
import { validators } from './constituency.model';
import ConstituencyService from './constituency.service';
import { paginationQueryParams, entityId } from '../../utils/validators';

export default [
  {
    method: 'GET',
    path: '/api/constituencies',
    config: {
      auth: false,
      handler: async (request) => {
        const {
          limit, page, populateRegion, populateDistrict,
        } = request.query;

        const populate = [];

        if (populateDistrict) {
          populate.push('district');
        }

        if (populateRegion) {
          populate.push('region');
        }

        return ConstituencyService.list({
          limit,
          page,
          populate,
        });
      },
      description: 'get constituencies',
      notes: 'This endpoint allows for the retrieval of all constituencies.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: Joi.array().items(validators.constituency),
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        query: paginationQueryParams({
          populateRegion: Joi.bool().default(false),
          populateDistrict: Joi.bool().default(false),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/api/constituencies/{id}',
    config: {
      auth: false,
      handler: async (request) => {
        const { id } = request.params;
        const { populateRegion, populateDistrict } = request.query;

        const populate = [];

        if (populateDistrict) {
          populate.push('district');
        }

        if (populateRegion) {
          populate.push('region');
        }

        return ConstituencyService.findById(id, populate);
      },
      description: 'get constituency',
      notes: 'This endpoint allows for the retrieval of a specific constituency by id.',
      plugins: {
        'hapi-swagger': {
          responses: {
            200: {
              description: 'Success',
              schema: validators.constituency,
            },
          },
        },
      },
      tags: ['api'],
      validate: {
        params: entityId,
        query: Joi.object({
          populateRegion: Joi.bool().default(false),
          populateDistrict: Joi.bool().default(false),
        }),
      },
    },
  },
];
