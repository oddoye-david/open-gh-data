import Joi from 'joi';

export const paginationQueryParams = Joi.object({
  limit: Joi.string(),
  page: Joi.string(),
});

export const response = dataValidator => Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: dataValidator,
}).label('Response');

export const entityId = Joi.object({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Must be a valid ObjectId'),
});
