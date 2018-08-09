import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';
import { removeFields } from '../../utils';

const HIDDEN_FIELDS = ['_id', 'ref', 'region_ref'];

const DistrictSchema = new Schema(
  {
    name: {
      type: String,
    },
    capital: {
      type: String,
    },
    ref: {
      type: String,
      unique: true,
    },
    region_ref: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(_, doc) {
        const returnedDoc = { ...doc };
        if (returnedDoc.region === null) {
          delete returnedDoc.region;
        }
        return removeFields(HIDDEN_FIELDS, returnedDoc);
      },
    },
  },
);

DistrictSchema.virtual('region', {
  ref: 'Region',
  localField: 'region_ref',
  foreignField: 'ref',
  justOne: true,
});

const DistrictModel = mongoose.model('District', DistrictSchema);

export const validators = {
  district: Joi.object({
    name: Joi.string().required(),
    capital: Joi.string().required(),
    region: Joi.object(),
  }),
};

export default DistrictModel;
