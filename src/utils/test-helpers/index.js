import mongoose from 'mongoose';

export function baseRouteTests({ path, model: Model }) {
  return {
    list: async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: `/api/${path}`,
      });

      expect(response.statusCode).toBe(200);
    },
    listWithLimitParam: async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: `/api/${path}?limit=2`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.length).toBe(2);
    },
    listWithLimitAndPageParam: async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: `/api/${path}?limit=1&page=2`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.length).toBe(1);
    },
    find: async () => {
      const random = Date.now();
      const testModel = new Model({ ref: random, name: `Test ${path}` });
      const { _id } = await testModel.save();
      const response = await testServer.inject({
        method: 'GET',
        url: `/api/${path}/${_id}`,
      });
      expect(response.statusCode).toBe(200);
      expect(response.result.name).toBe(`Test ${path}`);
    },
    invalidId: async () => {
      const response = await testServer.inject({
        method: 'GET',
        url: `/api/${path}/invalid_id`,
      });
      expect(response.statusCode).toBe(400);
    },
  };
}

export function connectToTestDB() {
  return mongoose.connect(
    'mongodb://localhost:27017/open-gh-data-test',
    { useNewUrlParser: true },
  );
}
