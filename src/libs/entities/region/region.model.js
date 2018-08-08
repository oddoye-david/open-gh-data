import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

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
  },
  {
    timestamps: true,
  },
);

const RegionModel = mongoose.model('Regions', RegionSchema);

export const validators = {
  region: Joi.object({
    name: Joi.string().required(),
  }),
};

export default RegionModel;
