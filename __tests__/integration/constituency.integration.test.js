import mongoose from 'mongoose';

import District from '../../src/entities/district/district.model';
import Region from '../../src/entities/region/region.model';
import { initializeServer } from '../../src/server';
import Constituency from '../../src/entities/constituency/constituency.model';

describe('Constituency integration tests', () => {
  let testServer;

  beforeAll(async () => {
    testServer = await initializeServer();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list constituencies and populate region', async () => {
    const response = await testServer.inject({
      method: 'GET',
      url: '/api/constituencies?populateRegion=true',
    });
    expect(response.statusCode).toBe(200);
    expect(response.result[0].region.name).toBe('A Region');
  });

  it('Should list a constituency and populate region', async () => {
    const random = Date.now();
    const testConstituency = new Constituency({
      name: 'Test Constituency 4',
      ref: random,
      region_ref: `region-${random}`,
    });
    const testRegion = new Region({ name: 'Test Region 4', ref: `region-${random}` });
    const [, constituency] = await Promise.all([testRegion.save(), testConstituency.save()]);
    const { _id } = constituency;

    const response = await testServer.inject({
      method: 'GET',
      url: `/api/constituencies/${_id}?populateRegion=true`,
    });
    const jsonPayload = response.result;

    expect(response.statusCode).toBe(200);
    expect(jsonPayload.name).toBe('Test Constituency 4');
    expect(jsonPayload.region.name).toBe('Test Region 4');
  });

  it('should list constituencies and populate district', async () => {
    const response = await testServer.inject({
      method: 'GET',
      url: '/api/constituencies?populateDistrict=true',
    });
    expect(response.statusCode).toBe(200);
    expect(response.result[0].district.name).toBe('A District');
  });

  it('Should list a constituency and populate district', async () => {
    const random = Date.now();
    const testConstituency = new Constituency({
      name: 'Test Constituency 4',
      ref: random,
      district_ref: `district-${random}`,
    });
    const testDistrict = new District({ name: 'Test District 4', ref: `district-${random}` });
    const [constituency] = await Promise.all([testConstituency.save(), testDistrict.save()]);
    const { _id } = constituency;

    const response = await testServer.inject({
      method: 'GET',
      url: `/api/constituencies/${_id}?populateDistrict=true`,
    });
    const jsonPayload = response.result;

    expect(response.statusCode).toBe(200);
    expect(jsonPayload.name).toBe('Test Constituency 4');
    expect(jsonPayload.district.name).toBe('Test District 4');
  });
});
