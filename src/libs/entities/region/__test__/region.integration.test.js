import mongoose from 'mongoose';

import { initializeServer } from '../../../../server';
import { baseRouteTests } from '../../../utils/test-helpers/base-route-test';
import Region from '../region.model';

const baseTests = baseRouteTests({ name: 'region', path: 'regions', model: Region });

describe('Region integration tests', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://localhost:27017/test-db',
      { useNewUrlParser: true },
    );

    server = await initializeServer();
    await Region.remove({});
  });

  afterEach(async () => {
    await Region.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list regions', async () => {
    await baseTests.list(server);
  });

  it('should return regions according to limit query param', async () => {
    await baseTests.listWithLimitParam(server);
  });

  it('should return regions according to limit and page query param', async () => {
    await baseTests.listWithLimitAndPageParam(server);
  });

  it('should list a region', async () => {
    await baseTests.find(server);
  });

  it('Should return status 400 if id is invalid', async () => {
    await baseTests.invalidId(server);
  });
});
