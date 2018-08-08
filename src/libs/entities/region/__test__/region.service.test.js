import Service from '../../../utils/service';

describe('Region Service', () => {
  it('Should list all regions', () => {
    const modelMock = {
      find: jest.fn().mockImplementation(() => ({ exec: () => {} })),
    };

    const RegionService = new Service(modelMock);
    RegionService.list();

    expect(modelMock.find.mock.calls.length).toBe(1);
  });

  it('Should list a specific region', () => {
    const modelMock = {
      findById: jest.fn(),
    };

    const RegionService = new Service(modelMock);
    RegionService.findById(42);

    expect(modelMock.findById.mock.calls[0]).toEqual([42]);
    expect(modelMock.findById.mock.calls.length).toBe(1);
  });
});
