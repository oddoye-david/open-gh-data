import mongoose from 'mongoose';

import District from '../../src/entities/district/district.model';
import Region from '../../src/entities/region/region.model';
import { initializeServer } from '../../src/server';

describe('District integration tests', () => {
  let testServer;

  beforeAll(async () => {
    testServer = await initializeServer();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list districts and populate region', async () => {
    const response = await testServer.inject({
      method: 'GET',
      url: '/api/districts?populateRegion=true',
    });
    expect(response.statusCode).toBe(200);
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
