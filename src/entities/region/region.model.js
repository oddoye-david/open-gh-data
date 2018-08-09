import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import { removeFields } from '../../utils';

const HIDDEN_FIELDS = ['_id', 'ref'];

const RegionSchema = new Schema(
  {
    name: {
      type: String,
    },
    capital: {
      type: String,
    },
    area: {
      type: Number,
    },
    population: {
      type: Number,
    },
    ref: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: {
      transform(_, doc) {
        const returnedDoc = { ...doc };
        return removeFields(HIDDEN_FIELDS, returnedDoc);
      },
    },
  },
);

const RegionModel = mongoose.model('Region', RegionSchema);

export const validators = {
  region: Joi.object({
    name: Joi.string().required(),
    capital: Joi.string().required(),
    area: Joi.number().required(),
    population: Joi.number().required(),
  }),
};

export default RegionModel;
