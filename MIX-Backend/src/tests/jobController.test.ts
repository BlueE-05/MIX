import { getJobs, getTeams } from '@/controllers/job.controller';
import { getJobsDB, getTeamsDB } from '@/db/job';
import { Request, Response } from 'express';

// Mock the database functions
jest.mock('@/db/job', () => ({
  getJobsDB: jest.fn().mockImplementation((req, res) => {
    // Simulate what the DB function would do with the response
    res.json({ success: true });
  }),
  getTeamsDB: jest.fn().mockImplementation((req, res) => {
    // Simulate what the DB function would do with the response
    res.json({ success: true });
  }),
}));

describe('JobController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
    responseObject = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getJobs', () => {
    it('should call getJobsDB with request and response', async () => {
      await getJobs(mockRequest as Request, mockResponse as Response);
      
      expect(getJobsDB).toHaveBeenCalledTimes(1);
      expect(getJobsDB).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(responseObject).toEqual({ success: true });
    });

    it('should not handle errors since controller is pass-through', async () => {
      const error = new Error('Database error');
      (getJobsDB as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });

      await expect(getJobs(mockRequest as Request, mockResponse as Response))
        .rejects.toThrow('Database error');
      
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalledWith(expect.objectContaining({
        error: expect.anything()
      }));
    });
  });

  describe('getTeams', () => {
    it('should call getTeamsDB with request and response', async () => {
      await getTeams(mockRequest as Request, mockResponse as Response);
      
      expect(getTeamsDB).toHaveBeenCalledTimes(1);
      expect(getTeamsDB).toHaveBeenCalledWith(mockRequest, mockResponse);
      expect(responseObject).toEqual({ success: true });
    });

    it('should not handle errors since controller is pass-through', async () => {
      const error = new Error('Database error');
      (getTeamsDB as jest.Mock).mockImplementationOnce(() => {
        throw error;
      });

      await expect(getTeams(mockRequest as Request, mockResponse as Response))
        .rejects.toThrow('Database error');
      
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalledWith(expect.objectContaining({
        error: expect.anything()
      }));
    });
  });
});