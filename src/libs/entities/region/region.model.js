import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

const RegionSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model('Regions', RegionSchema);

export const validators = {
  region: Joi.object({
    name: Joi.string().required(),
  }),
};

export default model;
