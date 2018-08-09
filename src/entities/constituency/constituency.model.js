import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

import { validators as regionValidators } from '../region/region.model';
import { validators as districtValidators } from '../district/district.model';
import { removeFields } from '../../utils';

const HIDDEN_FIELDS = ['_id', 'ref', 'region_ref', 'district_ref'];

const ConstituencySchema = new Schema(
  {
    name: {
      type: String,
    },
    district_ref: {
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
        if (returnedDoc.district === null) {
          delete returnedDoc.district;
        }
        return removeFields(HIDDEN_FIELDS, returnedDoc);
      },
    },
  },
);

ConstituencySchema.virtual('region', {
  ref: 'Region',
  localField: 'region_ref',
  foreignField: 'ref',
  justOne: true,
});

ConstituencySchema.virtual('district', {
  ref: 'District',
  localField: 'district_ref',
  foreignField: 'ref',
  justOne: true,
});

const ConstituencyModel = mongoose.model('Constituency', ConstituencySchema);

export const validators = {
  constituency: Joi.object({
    name: Joi.string().required(),
    region: regionValidators.region,
    district: districtValidators.districtWithoutRegion,
  }),
};

export default ConstituencyModel;
