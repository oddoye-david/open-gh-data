import Service from '../../../utils/service';

describe('District Service', () => {
  it('Should list all districts', () => {
    const modelMock = {
      find: jest.fn().mockImplementation(() => ({ exec: () => {} })),
    };

    const DistrictService = new Service(modelMock);
    DistrictService.list();

    expect(modelMock.find.mock.calls.length).toBe(1);
  });

  it('Should list a specific district', () => {
    const modelMock = {
      findById: jest.fn(),
    };

    const DistrictService = new Service(modelMock);
    DistrictService.findById(42);

    expect(modelMock.findById.mock.calls[0]).toEqual([42]);
    expect(modelMock.findById.mock.calls.length).toBe(1);
  });
});
