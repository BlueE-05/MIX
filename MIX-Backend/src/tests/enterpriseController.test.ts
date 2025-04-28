import ContactController from '@/controllers/enterprises';
import EnterpriseService from '@/db/enterprises';
import Enterprise from '@/types/controller/Enterprise';
import EnterpriseDB from '@/types/db/EnterpriseDB';

// Mock the EnterpriseService completely
jest.mock('@/db/enterprises', () => {
  return jest.fn().mockImplementation(() => ({
    getEnterprise: jest.fn(),
    createEnterprise: jest.fn(),
  }));
});

describe('EnterpriseController', () => {
  let controller: ContactController;
  let mockService: jest.Mocked<EnterpriseService>;

  const mockEnterprise: Enterprise = {
    ID: 1,
    Name: 'Test Enterprise'
  };

  const mockEnterpriseDB: EnterpriseDB = {
    ID: null,
    Name: 'Test Enterprise',
    Description: 'Test Description',
    Industry: 'Technology',
    Website: 'https://example.com',
    Address: '123 Test St'
  };

  beforeEach(() => {
    // Create a new mock service instance
    mockService = new EnterpriseService() as jest.Mocked<EnterpriseService>;
    // Create controller with the mocked service
    controller = new ContactController();
    // Replace the controller's service with our mock
    controller['service'] = mockService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEnterprise', () => {
    it('should return all enterprises', async () => {
      const mockEnterprises: Enterprise[] = [mockEnterprise];
      mockService.getEnterprise.mockResolvedValue(mockEnterprises);

      const result = await controller.getEnterprise();

      expect(mockService.getEnterprise).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEnterprises);
    });

    it('should handle errors when getting enterprises', async () => {
      const error = new Error('Database error');
      mockService.getEnterprise.mockRejectedValue(error);

      await expect(controller.getEnterprise()).rejects.toThrow(error);
      expect(mockService.getEnterprise).toHaveBeenCalledTimes(1);
    });
  });

  describe('createEnterprise', () => {
    it('should create a new enterprise', async () => {
      mockService.createEnterprise.mockResolvedValue(undefined);

      await controller.createEnterprise(mockEnterpriseDB);

      expect(mockService.createEnterprise).toHaveBeenCalledTimes(1);
      expect(mockService.createEnterprise).toHaveBeenCalledWith(mockEnterpriseDB);
    });

    it('should handle errors during enterprise creation', async () => {
      const error = new Error('Creation failed');
      mockService.createEnterprise.mockRejectedValue(error);

      await expect(controller.createEnterprise(mockEnterpriseDB)).rejects.toThrow(error);
      expect(mockService.createEnterprise).toHaveBeenCalledTimes(1);
      expect(mockService.createEnterprise).toHaveBeenCalledWith(mockEnterpriseDB);
    });
  });
});