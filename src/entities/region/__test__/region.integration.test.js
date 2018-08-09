import mongoose from 'mongoose';

import { baseRouteTests } from '../../../utils/test-helpers';
import Region from '../region.model';

const baseTests = baseRouteTests({ path: 'regions', model: Region });

describe('Region integration tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list regions', async () => {
    await baseTests.list();
  });

  it('should return regions according to limit query param', async () => {
    await baseTests.listWithLimitParam();
  });

  it('should return regions according to limit and page query param', async () => {
    await baseTests.listWithLimitAndPageParam();
  });

  it('should list a region', async () => {
    await baseTests.find();
  });

  it('Should return status 400 if id is invalid', async () => {
    await baseTests.invalidId();
  });
});
