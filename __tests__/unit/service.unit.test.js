import Service from '../../src/utils/service';

describe('Service Tests', () => {
  it('Should list all entities', () => {
    const modelMock = {
      find: jest.fn().mockImplementation(() => {
        const that = {
          exec: () => that,
          sort: () => that,
          populate: () => that,
        };

        return that;
      }),
    };

    const InstantiatedService = new Service(modelMock);
    InstantiatedService.list();

    expect(modelMock.find.mock.calls.length).toBe(1);
  });

  it('Should list a specific entity', () => {
    const modelMock = {
      findById: jest.fn(),
    };

    const InstantiatedService = new Service(modelMock);
    InstantiatedService.findById(42);

    expect(modelMock.findById.mock.calls[0]).toEqual([42]);
    expect(modelMock.findById.mock.calls.length).toBe(1);
  });
});
