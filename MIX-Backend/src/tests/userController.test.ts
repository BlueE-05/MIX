// src/tests/userController.test.ts

import { UserController } from '@/controllers/user.controller';
import { Auth0Service } from '@/services/auth0.service';
import { UserDbService } from '@/db/user';
import { EmailService } from '@/services/email.service';
import { Request, Response } from 'express';
import { AuthRequest, Auth0User } from '@/types/controller/auth0';
import { setAuthCookies, clearAuthCookies } from '@/utils/cookieManager';
import { UserDTO } from '@/types/db/user';

// Mock dependencies
jest.mock('@/services/auth0.service', () => ({
  Auth0Service: jest.fn().mockImplementation(() => ({
    createUser: jest.fn(),
    getUserBySub: jest.fn(),
    sendVerificationEmail: jest.fn(),
    loginWithEmailPassword: jest.fn(),
    linkPasswordResetEmail: jest.fn().mockResolvedValue({ ticket: 'reset-link' })
  }))
}));

jest.mock('@/db/user', () => ({
  UserDbService: jest.fn().mockImplementation(() => ({
    createUser: jest.fn(),
    getUserByEmail: jest.fn(),
    updateEmailVerified: jest.fn(),
    getLastVerificationSent: jest.fn(),
    insertVerificationEmail: jest.fn(),
    getLastForgotPasswordSent: jest.fn(),
    insertForgotPasswordEmail: jest.fn(),
    updateProfilePictureInDb: jest.fn()
  }))
}));

jest.mock('@/services/email.service', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendResetPassword: jest.fn()
  }))
}));

jest.mock('@/utils/cookieManager', () => ({
  setAuthCookies: jest.fn(),
  clearAuthCookies: jest.fn()
}));

describe('UserController', () => {
  let controller: UserController;
  let mockAuth0Service: jest.Mocked<Auth0Service>;
  let mockUserDbService: jest.Mocked<UserDbService>;
  let mockEmailService: jest.Mocked<EmailService>;
  let mockRequest: Partial<Request & AuthRequest>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  const mockUserDTO: UserDTO = {
    Name: 'John',
    LastName: 'Doe',
    Email: 'john.doe@example.com',
    Password: 'securePassword123!',
    PhoneNumber: '+1234567890',
    BirthDate: '1990-01-01',
    Education: 'Bachelor\'s Degree',
    ProfilePic: null,
    EmailVerified: false,
    IDJobPosition: null
  };

  const mockAuth0User: Auth0User = {
    email_verified: false,
    user_id: 'auth0|1234567890'
  };

  beforeEach(() => {
    mockAuth0Service = new (require('@/services/auth0.service').Auth0Service)();
    mockUserDbService = new (require('@/db/user').UserDbService)();
    mockEmailService = new (require('@/services/email.service').EmailService)();

    controller = new UserController(
      mockAuth0Service,
      mockUserDbService,
      mockEmailService
    );

    mockRequest = {
      body: {},
      auth: {
        sub: 'auth0|1234567890',
        email: 'john.doe@example.com',
        email_verified: false
      }
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      })
    };

    responseObject = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      mockRequest.body = mockUserDTO;
      mockAuth0Service.createUser.mockResolvedValue(mockAuth0User);
      mockAuth0Service.loginWithEmailPassword.mockResolvedValue({
        access_token: 'access_token_123',
        refresh_token: 'refresh_token_123'
      });

      await controller.signup(mockRequest as Request, mockResponse as Response);

      expect(mockAuth0Service.createUser).toHaveBeenCalledWith(
        mockUserDTO.Email.toLowerCase(),
        mockUserDTO.Password
      );
      expect(mockUserDbService.createUser).toHaveBeenCalled();
      expect(setAuthCookies).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual({ message: "User created and logged in" });
    });

    it('should return 400 if required fields are missing', async () => {
      mockRequest.body = {};

      await controller.signup(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ error: "Email and password are required" });
    });

    it('should handle Auth0 creation error', async () => {
      mockRequest.body = mockUserDTO;
      mockAuth0Service.createUser.mockRejectedValue(new Error('Auth0 creation failed'));

      await controller.signup(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({ error: "Error creating user" });
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: mockUserDTO.Email,
        email_verified: true
      });
      mockUserDbService.getUserByEmail.mockResolvedValue(mockUserDTO);

      await controller.getProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockUserDTO);
    });

    it('should handle missing auth sub', async () => {
      mockRequest.auth = undefined;

      await controller.getProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ error: "Token without sub" });
    });

    it('should handle user not found', async () => {
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: mockUserDTO.Email,
        email_verified: true
      });
      mockUserDbService.getUserByEmail.mockResolvedValue(null);

      await controller.getProfile(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ error: "User not found" });
    });
  });

  describe('resendVerificationEmail', () => {
    it('should enforce cooldown', async () => {
      const lastSent = new Date(Date.now() - (9 * 60 * 1000)); // 9 minutes ago
      mockUserDbService.getLastVerificationSent.mockResolvedValue(lastSent);
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: mockUserDTO.Email,
        email_verified: false
      });

      await controller.resendVerificationEmail(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(responseObject.secondsLeft).toBeGreaterThan(0);
    });

    it('should send verification after cooldown', async () => {
      const lastSent = new Date(Date.now() - (11 * 60 * 1000)); // 11 minutes ago
      mockUserDbService.getLastVerificationSent.mockResolvedValue(lastSent);
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: mockUserDTO.Email,
        email_verified: false
      });

      await controller.resendVerificationEmail(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockAuth0Service.sendVerificationEmail).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors', async () => {
      mockAuth0Service.getUserBySub.mockRejectedValue(new Error('Auth0 error'));

      await controller.resendVerificationEmail(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('forgotPassword', () => {
    it('should validate email input', async () => {
      mockRequest.body = { email: undefined };

      await controller.forgotPassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ error: "Email is required" });
    });

    it('should send reset password email', async () => {
      mockRequest.body = { email: mockUserDTO.Email };
      mockUserDbService.getLastForgotPasswordSent.mockResolvedValue(null);

      await controller.forgotPassword(mockRequest as Request, mockResponse as Response);

      expect(mockEmailService.sendResetPassword).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle reset errors', async () => {
      mockRequest.body = { email: mockUserDTO.Email };
      mockUserDbService.getLastForgotPasswordSent.mockResolvedValue(null);
      mockAuth0Service.linkPasswordResetEmail.mockRejectedValue(new Error('Auth0 error'));

      await controller.forgotPassword(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getEmailStatus', () => {
    it('should return email status', async () => {
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: 'test@example.com',
        email_verified: true
      });

      await controller.getEmailStatus(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual({
        email: 'test@example.com',
        email_verified: true
      });
    });

    it('should handle missing auth', async () => {
      mockRequest.auth = undefined;

      await controller.getEmailStatus(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual({
        email: null,
        email_verified: false
      });
    });
  });

  describe('logout', () => {
    it('should clear auth cookies', () => {
      controller.logout(mockRequest as Request, mockResponse as Response);

      expect(clearAuthCookies).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('updateProfilePicture', () => {
    it('should validate profile pic format', async () => {
      mockRequest.body = { ProfilePic: 'invalid-data' };

      await controller.updateProfilePicture(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ error: "ProfilePic is required" });
    });

    it('should update profile picture', async () => {
      const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFhQHQwUJjkwAAAABJRU5ErkJggg==';
      mockRequest.body = { ProfilePic: base64Image };
      mockAuth0Service.getUserBySub.mockResolvedValue({
        email: mockUserDTO.Email,
        email_verified: true
      });

      await controller.updateProfilePicture(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockUserDbService.updateProfilePictureInDb).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors when fetching user', async () => {
      const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFhQHQwUJjkwAAAABJRU5ErkJggg==';
      mockRequest.body = { ProfilePic: base64Image };
      mockAuth0Service.getUserBySub.mockRejectedValue(new Error('Auth0 error'));

      await controller.updateProfilePicture(mockRequest as AuthRequest, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
    });
  });
});