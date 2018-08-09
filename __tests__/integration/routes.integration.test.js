import mongoose from 'mongoose';
import { initializeServer } from '../../src/server';
import RegionModel from '../../src/entities/region/region.model';
import DistrictModel from '../../src/entities/district/district.model';

const ENTITIES = [
  { name: 'region', path: 'regions', model: RegionModel },
  { name: 'district', path: 'districts', model: DistrictModel },
];

describe('API Route tests', () => {
  let testServer;

  beforeAll(async () => {
    testServer = await initializeServer();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  ENTITIES.forEach(({ name, path, model: Model }) => {
    describe(`${name} route tests`, () => {
      it(`should list ${name}`, async () => {
        const response = await testServer.inject({
          method: 'GET',
          url: `/api/${path}`,
        });

        expect(response.statusCode).toBe(200);
      });

      it(`should return single ${name} according to limit query param`, async () => {
        const response = await testServer.inject({
          method: 'GET',
          url: `/api/${path}?limit=2`,
        });

        expect(response.statusCode).toBe(200);
        expect(response.result.length).toBe(2);
      });

      it(`should list ${name} according to limit and page query param`, async () => {
        const response = await testServer.inject({
          method: 'GET',
          url: `/api/${path}?limit=1&page=2`,
        });

        expect(response.statusCode).toBe(200);
        expect(response.result.length).toBe(1);
      });

      it(`should list a single ${name}`, async () => {
        const random = Date.now();
        const testModel = new Model({ ref: random, name: `Test ${name}` });
        const { _id } = await testModel.save();
        const response = await testServer.inject({
          method: 'GET',
          url: `/api/${path}/${_id}`,
        });
        expect(response.statusCode).toBe(200);
        expect(response.result.name).toBe(`Test ${name}`);
      });

      it('Should return status 400 if id is invalid', async () => {
        const response = await testServer.inject({
          method: 'GET',
          url: `/api/${path}/invalid_id`,
        });
        expect(response.statusCode).toBe(400);
      });
    });
  });
});
