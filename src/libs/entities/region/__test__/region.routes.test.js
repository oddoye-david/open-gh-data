import mongoose from 'mongoose';

import { initializeServer } from '../../../../server';
import Region from '../region.model';

describe('Region routes tests', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-db');
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
    const response = await server.inject({
      method: 'GET',
      url: '/api/regions',
    });

    expect(response.statusCode).toBe(200);
  });

  it('Should list a region', async () => {
    const testRegion = new Region({ name: 'Test Region' });
    const { _id } = await testRegion.save();
    const response = await server.inject({
      method: 'GET',
      url: `/api/regions/${_id}`,
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload).name).toBe('Test Region');
  });

  it('Should return status 400 if id is invalid', async () => {
    const testRegion = new Region({ name: 'Test Region' });
    await testRegion.save();
    const response = await server.inject({
      method: 'GET',
      url: '/api/regions/invalid_id',
    });
    expect(response.statusCode).toBe(400);
  });
});
