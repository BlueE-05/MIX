import ProductController from '@/controllers/products';
import ProductService from '@/db/products';
import Product from '@/types/controller/Product';
import ProductDB from '@/types/db/ProductDB';

// Mock the ProductService completely
jest.mock('@/db/products', () => {
  return jest.fn().mockImplementation(() => ({
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    getProductByName: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  }));
});

describe('ProductController', () => {
  let controller: ProductController;
  let mockService: jest.Mocked<ProductService>;

  const mockProduct: Product = {
    RefNum: 'REF123',
    Name: 'Test Product',
    Description: 'Test Description',
    UnitaryPrice: 100,
    Commission: 10,
    ProductSheetURL: 'http://test.com/sheet',
    CreationDate: new Date()
  };

  const mockProductDB: ProductDB = {
    RefNum: 'REF123',
    Name: 'Test Product',
    Description: 'Test Description',
    UnitaryPrice: 100,
    Commission: 10,
    ProductSheetURL: 'http://test.com/sheet'
  };

  beforeEach(() => {
    // Create a new mock service instance
    mockService = new ProductService() as jest.Mocked<ProductService>;
    // Create controller with the mocked service
    controller = new ProductController();
    // Replace the controller's service with our mock
    controller['service'] = mockService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts: Product[] = [mockProduct];
      mockService.getAllProducts.mockResolvedValue(mockProducts);

      const result = await controller.getAllProducts();

      expect(mockService.getAllProducts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });

    it('should handle errors from service', async () => {
      const error = new Error('Database error');
      mockService.getAllProducts.mockRejectedValue(error);

      await expect(controller.getAllProducts()).rejects.toThrow(error);
      expect(mockService.getAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductById', () => {
    it('should return product by id', async () => {
      const mockProducts: Product[] = [mockProduct];
      const testId = 'REF123';
      mockService.getProductById.mockResolvedValue(mockProducts);

      const result = await controller.getProductById(testId);

      expect(mockService.getProductById).toHaveBeenCalledTimes(1);
      expect(mockService.getProductById).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockProducts);
    });

    it('should handle errors when getting by id', async () => {
      const error = new Error('Not found');
      const testId = 'NONEXISTENT';
      mockService.getProductById.mockRejectedValue(error);

      await expect(controller.getProductById(testId)).rejects.toThrow(error);
      expect(mockService.getProductById).toHaveBeenCalledWith(testId);
    });
  });

  describe('getProductByName', () => {
    it('should return product by name', async () => {
      const mockProducts: Product[] = [mockProduct];
      const testName = 'Test Product';
      mockService.getProductByName.mockResolvedValue(mockProducts);

      const result = await controller.getProductByName(testName);

      expect(mockService.getProductByName).toHaveBeenCalledTimes(1);
      expect(mockService.getProductByName).toHaveBeenCalledWith(testName);
      expect(result).toEqual(mockProducts);
    });

    it('should handle errors when getting by name', async () => {
      const error = new Error('Not found');
      const testName = 'Nonexistent Product';
      mockService.getProductByName.mockRejectedValue(error);

      await expect(controller.getProductByName(testName)).rejects.toThrow(error);
      expect(mockService.getProductByName).toHaveBeenCalledWith(testName);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      mockService.createProduct.mockResolvedValue(undefined);

      await controller.createProduct(mockProductDB);

      expect(mockService.createProduct).toHaveBeenCalledTimes(1);
      expect(mockService.createProduct).toHaveBeenCalledWith(mockProductDB);
    });

    it('should handle errors during creation', async () => {
      const error = new Error('Creation failed');
      mockService.createProduct.mockRejectedValue(error);

      await expect(controller.createProduct(mockProductDB)).rejects.toThrow(error);
      expect(mockService.createProduct).toHaveBeenCalledWith(mockProductDB);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const testId = 'REF123';
      mockService.updateProduct.mockResolvedValue(undefined);

      await controller.updateProduct(testId, mockProductDB);

      expect(mockService.updateProduct).toHaveBeenCalledTimes(1);
      expect(mockService.updateProduct).toHaveBeenCalledWith(testId, mockProductDB);
    });

    it('should handle errors during update', async () => {
      const error = new Error('Update failed');
      const testId = 'REF123';
      mockService.updateProduct.mockRejectedValue(error);

      await expect(controller.updateProduct(testId, mockProductDB)).rejects.toThrow(error);
      expect(mockService.updateProduct).toHaveBeenCalledWith(testId, mockProductDB);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const testId = 'REF123';
      mockService.deleteProduct.mockResolvedValue(undefined);

      await controller.deleteProduct(testId);

      expect(mockService.deleteProduct).toHaveBeenCalledTimes(1);
      expect(mockService.deleteProduct).toHaveBeenCalledWith(testId);
    });

    it('should handle errors during deletion', async () => {
      const error = new Error('Deletion failed');
      const testId = 'REF123';
      mockService.deleteProduct.mockRejectedValue(error);

      await expect(controller.deleteProduct(testId)).rejects.toThrow(error);
      expect(mockService.deleteProduct).toHaveBeenCalledWith(testId);
    });
  });
});