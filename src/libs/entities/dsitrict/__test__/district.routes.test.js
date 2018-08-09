import mongoose from 'mongoose';

import { initializeServer } from '../../../../server';
import District from '../district.model';
import Region from '../../region/region.model';

describe('District routes tests', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db');
    server = await initializeServer();
    await District.remove({});
  });

  afterEach(async () => {
    await District.remove({});
    await Region.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should list districts', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/districts',
    });

    expect(response.statusCode).toBe(200);
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
    expect(JSON.parse(response.payload)[0].region.name).toBe('Test Region');
  });

  it('Should list a district', async () => {
    const testDistrict = new District({ name: 'Test District' });
    const { _id } = await testDistrict.save();
    const response = await server.inject({
      method: 'GET',
      url: `/api/districts/${_id}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload).name).toBe('Test District');
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
    const jsonPayload = JSON.parse(response.payload);

    expect(response.statusCode).toBe(200);
    expect(jsonPayload.name).toBe('Test District');
    expect(jsonPayload.region.name).toBe('Test Region');
  });

  it('Should return status 400 if id is invalid', async () => {
    const testDistrict = new District({ name: 'Test District' });
    await testDistrict.save();
    const response = await server.inject({
      method: 'GET',
      url: '/api/districts/invalid_id',
    });
    expect(response.statusCode).toBe(400);
  });
});
