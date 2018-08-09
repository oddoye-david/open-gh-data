import mongoose from 'mongoose';

import { initializeServer } from '../../../../server';
import District from '../district.model';
import Region from '../../region/region.model';
import { baseRouteTests } from '../../../utils/test-helpers/base-route-test';

const baseTests = baseRouteTests({
  name: 'district',
  path: 'districts',
  model: District,
});

describe('District integration tests', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(
      'mongodb://localhost:27017/test-db',
      { useNewUrlParser: true },
    );

    server = await initializeServer();
    await Region.remove({});
    await District.remove({});
  });

  afterEach(async () => {
    await Region.remove({});
    await District.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list districts', async () => {
    await baseTests.list(server);
  });

  it('should return districts according to limit query param', async () => {
    await baseTests.listWithLimitParam(server);
  });

  it('should return districts according to limit and page query param', async () => {
    await baseTests.listWithLimitAndPageParam(server);
  });

  it('should list a district', async () => {
    await baseTests.find(server);
  });

  it('Should return status 400 if id is invalid', async () => {
    await baseTests.invalidId(server);
  });

  it('should list districts and populate region', async () => {
    const testDistrict = new District({
      name: 'Test District',
      ref: 'test-district',
      region_ref: 'region_ref',
    });
    const testRegion = new Region({ name: 'Test Region', ref: 'region_ref' });
    await Promise.all([testRegion.save(), testDistrict.save()]);

    const response = await server.inject({
      method: 'GET',
      url: '/api/districts?populateRegion=true',
    });
    expect(response.statusCode).toBe(200);
    expect(response.result[0].region.name).toBe('Test Region');
  });

  it('Should list a district and populate region', async () => {
    const testDistrict = new District({
      name: 'Test District',
      ref: 'test-district',
      region_ref: 'region_ref',
    });
    const testRegion = new Region({ name: 'Test Region', ref: 'region_ref' });
    const [, district] = await Promise.all([testRegion.save(), testDistrict.save()]);
    const { _id } = district;

    const response = await server.inject({
      method: 'GET',
      url: `/api/districts/${_id}?populateRegion=true`,
    });
    const jsonPayload = response.result;

    expect(response.statusCode).toBe(200);
    expect(jsonPayload.name).toBe('Test District');
    expect(jsonPayload.region.name).toBe('Test Region');
  });
});
