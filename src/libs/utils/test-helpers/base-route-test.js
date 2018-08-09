export function baseRouteTests({ path, model: Model }) {
  return {
    list: async (server) => {
      const response = await server.inject({
        method: 'GET',
        url: `/api/${path}`,
      });

      expect(response.statusCode).toBe(200);
    },
    listWithLimitParam: async (server) => {
      const testModel1 = new Model({ name: 'Test Model 1', ref: 'test-model-1' });
      const testModel2 = new Model({ name: 'Test Model 2', ref: 'test-model-2' });
      const testModel3 = new Model({ name: 'Test Model 3', ref: 'test-model-3' });
      await Promise.all([testModel1.save(), testModel2.save(), testModel3.save()]);

      const response = await server.inject({
        method: 'GET',
        url: `/api/${path}?limit=2`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.length).toBe(2);
    },
    listWithLimitAndPageParam: async (server) => {
      const testModel1 = new Model({ name: 'Test Model 1', ref: 'test-model-1' });
      const testModel2 = new Model({ name: 'Test Model 2', ref: 'test-model-2' });
      const testModel3 = new Model({ name: 'Test Model 3', ref: 'test-model-3' });
      await Promise.all([testModel1.save(), testModel2.save(), testModel3.save()]);

      const response = await server.inject({
        method: 'GET',
        url: `/api/${path}?limit=1&page=2`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.result.length).toBe(1);
      expect(response.result[0].name).toBe('Test Model 2');
    },
    find: async (server) => {
      const testModel = new Model({ name: 'Test Model' });
      const { _id } = await testModel.save();
      const response = await server.inject({
        method: 'GET',
        url: `/api/${path}/${_id}`,
      });
      expect(response.statusCode).toBe(200);
      expect(response.result.name).toBe('Test Model');
    },
    invalidId: async (server) => {
      const testModel = new Model({ name: 'Test Model' });
      await testModel.save();
      const response = await server.inject({
        method: 'GET',
        url: `/api/${path}/invalid_id`,
      });
      expect(response.statusCode).toBe(400);
    },
  };
}
