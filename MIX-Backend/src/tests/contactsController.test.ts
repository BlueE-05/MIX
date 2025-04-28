import ContactController from '@/controllers/contacts';
import ContactService from '@/db/contacts';
import Contact from '@/types/controller/Contact';
import ContactDB from '@/types/db/ContactDB';
import Enterprise from '@/types/controller/Enterprise';
import EnterpriseDB from '@/types/db/EnterpriseDB';

// Mock the ContactService completely
jest.mock('@/db/contacts', () => {
  return jest.fn().mockImplementation(() => ({
    getAllContacts: jest.fn(),
    getContactById: jest.fn(),
    getContactByName: jest.fn(),
    getContactByEnterprise: jest.fn(),
    getEnterprise: jest.fn(),
    createContact: jest.fn(),
    createEnterprise: jest.fn(),
    updateContact: jest.fn(),
    deleteContact: jest.fn(),
  }));
});

describe('ContactController', () => {
  let controller: ContactController;
  let mockService: jest.Mocked<ContactService>;

  const mockContact: Contact = {
    ID: 1,
    Name: 'John',
    LastName: 'Doe',
    EnterpriseName: 'Test Enterprise',
    Status: true,
    PhoneNumber: '1234567890',
    Email: 'john@example.com',
    CreationDate: new Date()
  };

  const mockContactDB: ContactDB = {
    ID: null,
    Name: 'John',
    LastName: 'Doe',
    EnterpriseName: 'Test Enterprise',
    Email: 'john@example.com',
    PhoneNumber: '1234567890',
    CreationDate: null
  };

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
    mockService = new ContactService() as jest.Mocked<ContactService>;
    // Create controller with the mocked service
    controller = new ContactController();
    // Replace the controller's service with our mock
    controller['service'] = mockService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllContacts', () => {
    it('should return all contacts for a user', async () => {
      const mockContacts: Contact[] = [mockContact];
      mockService.getAllContacts.mockResolvedValue(mockContacts);

      const result = await controller.getAllContacts('user123');

      expect(mockService.getAllContacts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockContacts);
    });

    it('should handle errors when getting contacts', async () => {
      const error = new Error('Database error');
      mockService.getAllContacts.mockRejectedValue(error);

      await expect(controller.getAllContacts('user123')).rejects.toThrow(error);
    });
  });

  describe('getContactById', () => {
    it('should return contact by id', async () => {
      const mockContacts: Contact[] = [mockContact];
      mockService.getContactById.mockResolvedValue(mockContacts);

      const result = await controller.getContactById('user123', 1);

      expect(mockService.getContactById).toHaveBeenCalledTimes(1);
      expect(mockService.getContactById).toHaveBeenCalledWith('user123', 1);
      expect(result).toEqual(mockContacts);
    });

    it('should handle errors when getting contact by id', async () => {
      const error = new Error('Contact not found');
      mockService.getContactById.mockRejectedValue(error);

      await expect(controller.getContactById('user123', 999)).rejects.toThrow(error);
    });
  });

  describe('getContactByName', () => {
    it('should return contacts by name', async () => {
      const mockContacts: Contact[] = [mockContact];
      mockService.getContactByName.mockResolvedValue(mockContacts);

      const result = await controller.getContactByName('user123', 'John');

      expect(mockService.getContactByName).toHaveBeenCalledTimes(1);
      expect(mockService.getContactByName).toHaveBeenCalledWith('user123', 'John');
      expect(result).toEqual(mockContacts);
    });

    it('should handle errors when getting contacts by name', async () => {
      const error = new Error('No contacts found');
      mockService.getContactByName.mockRejectedValue(error);

      await expect(controller.getContactByName('user123', 'Nonexistent')).rejects.toThrow(error);
    });
  });

  describe('getContactByEnterprise', () => {
    it('should return contacts by enterprise', async () => {
      const mockContacts: Contact[] = [mockContact];
      mockService.getContactByEnterprise.mockResolvedValue(mockContacts);

      const result = await controller.getContactByEnterprise('user123', 'Test Enterprise');

      expect(mockService.getContactByEnterprise).toHaveBeenCalledTimes(1);
      expect(mockService.getContactByEnterprise).toHaveBeenCalledWith('user123', 'Test Enterprise');
      expect(result).toEqual(mockContacts);
    });

    it('should handle errors when getting contacts by enterprise', async () => {
      const error = new Error('No contacts found');
      mockService.getContactByEnterprise.mockRejectedValue(error);

      await expect(controller.getContactByEnterprise('user123', 'Nonexistent Enterprise')).rejects.toThrow(error);
    });
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
    });
  });

  describe('createContact', () => {
    it('should create a new contact', async () => {
      mockService.createContact.mockResolvedValue(undefined);

      await controller.createContact('user123', mockContactDB);

      expect(mockService.createContact).toHaveBeenCalledTimes(1);
      expect(mockService.createContact).toHaveBeenCalledWith('user123', mockContactDB);
    });

    it('should handle errors during contact creation', async () => {
      const error = new Error('Creation failed');
      mockService.createContact.mockRejectedValue(error);

      await expect(controller.createContact('user123', mockContactDB)).rejects.toThrow(error);
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
    });
  });

  describe('updateContact', () => {
    it('should update an existing contact', async () => {
      mockService.updateContact.mockResolvedValue(undefined);

      await controller.updateContact(1, mockContact);

      expect(mockService.updateContact).toHaveBeenCalledTimes(1);
      expect(mockService.updateContact).toHaveBeenCalledWith(1, mockContact);
    });

    it('should handle errors during contact update', async () => {
      const error = new Error('Update failed');
      mockService.updateContact.mockRejectedValue(error);

      await expect(controller.updateContact(1, mockContact)).rejects.toThrow(error);
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact', async () => {
      mockService.deleteContact.mockResolvedValue(undefined);

      await controller.deleteContact(1);

      expect(mockService.deleteContact).toHaveBeenCalledTimes(1);
      expect(mockService.deleteContact).toHaveBeenCalledWith(1);
    });

    it('should handle errors during contact deletion', async () => {
      const error = new Error('Deletion failed');
      mockService.deleteContact.mockRejectedValue(error);

      await expect(controller.deleteContact(1)).rejects.toThrow(error);
    });
  });
});