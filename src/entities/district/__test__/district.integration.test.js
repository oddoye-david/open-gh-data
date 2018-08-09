import mongoose from 'mongoose';

import District from '../district.model';
import Region from '../../region/region.model';
import { baseRouteTests } from '../../../utils/test-helpers';

const baseTests = baseRouteTests({
  name: 'district',
  path: 'districts',
  model: District,
});

describe('District integration tests', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list districts', async () => {
    await baseTests.list();
  });

  it('should return districts according to limit query param', async () => {
    await baseTests.listWithLimitParam();
  });

  it('should return districts according to limit and page query param', async () => {
    await baseTests.listWithLimitAndPageParam();
  });

  it('should list a district', async () => {
    await baseTests.find();
  });

  it('Should return status 400 if id is invalid', async () => {
    await baseTests.invalidId();
  });

  it('should list districts and populate region', async () => {
    const response = await testServer.inject({
      method: 'GET',
      url: '/api/districts?populateRegion=true',
    });
    expect(response.statusCode).toBe(200);
    console.log(response.result[0], response.result.length);
    expect(response.result[0].region.name).toBe('A Region');
  });

  it('Should list a district and populate region', async () => {
    const random = Date.now();
    const testDistrict = new District({
      name: 'Test District 4',
      ref: random,
      region_ref: `region-${random}`,
    });
    const testRegion = new Region({ name: 'Test Region 4', ref: `region-${random}` });
    const [, district] = await Promise.all([testRegion.save(), testDistrict.save()]);
    const { _id } = district;

    const response = await testServer.inject({
      method: 'GET',
      url: `/api/districts/${_id}?populateRegion=true`,
    });
    const jsonPayload = response.result;

    expect(response.statusCode).toBe(200);
    expect(jsonPayload.name).toBe('Test District 4');
    expect(jsonPayload.region.name).toBe('Test Region 4');
  });
});
