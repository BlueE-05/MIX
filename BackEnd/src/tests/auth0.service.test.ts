import { Auth0Service } from "../services/auth0.service";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const service = new Auth0Service();

describe("Auth0Service.userExists", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería retornar true si el usuario existe en Auth0", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { access_token: "mock_token" } });
    mockedAxios.get.mockResolvedValueOnce({ data: [{ email: "test@example.com" }] });

    const exists = await service.userExists("test@example.com");
    expect(exists).toBe(true);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/users-by-email"),
      expect.objectContaining({
        params: { email: "test@example.com" },
        headers: expect.objectContaining({ Authorization: "Bearer mock_token" }),
      })
    );
  });

  it("debería retornar false si el usuario NO existe en Auth0", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { access_token: "mock_token" } });
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const exists = await service.userExists("no-user@example.com");
    expect(exists).toBe(false);
  });

  it("debería lanzar error si Auth0 falla", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { access_token: "mock_token" } });
    mockedAxios.get.mockRejectedValueOnce(new Error("Auth0 API error"));

    await expect(service.userExists("fail@example.com")).rejects.toThrow("Auth0 API error");
  });
});


describe("Auth0Service.createUser", () => {
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("debería crear el usuario en Auth0 correctamente", async () => {
      mockedAxios.post
        .mockResolvedValueOnce({ data: { access_token: "mock_token" } }) // getAccessToken
        .mockResolvedValueOnce({ data: { email_verified: true } }); // createUser
  
      const result = await service.createUser("new@example.com", "mypassword123");
  
      expect(result).toEqual({ email_verified: true });
      expect(mockedAxios.post).toHaveBeenCalledTimes(2);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/v2/users"),
        expect.objectContaining({
          email: "new@example.com",
          password: "mypassword123",
          connection: "Username-Password-Authentication"
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer mock_token"
          })
        })
      );
    });
  
    it("debería lanzar error si la API de Auth0 falla", async () => {
      mockedAxios.post
        .mockResolvedValueOnce({ data: { access_token: "mock_token" } }) // getAccessToken
        .mockRejectedValueOnce(new Error("Failed to create user")); // createUser
  
      await expect(
        service.createUser("fail@example.com", "badpass")
      ).rejects.toThrow("Failed to create user");
    });
  });


  describe("Auth0Service.loginWithEmailPassword", () => {
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("debería retornar tokens válidos si el login es exitoso", async () => {
      const mockTokens = {
        access_token: "access123",
        id_token: "id123"
      };
  
      mockedAxios.post.mockResolvedValueOnce({ data: mockTokens });
  
      const result = await service.loginWithEmailPassword("test@example.com", "secure123");
  
      expect(result).toEqual(mockTokens);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining("/oauth/token"),
        expect.objectContaining({
          grant_type: "password",
          username: "test@example.com",
          password: "secure123",
          audience: expect.any(String),
          client_id: expect.any(String),
          client_secret: expect.any(String),
          scope: "openid profile email",
          connection: "Username-Password-Authentication"
        })
      );
    });
  
    it("debería lanzar error si Auth0 rechaza las credenciales", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Invalid credentials"));
  
      await expect(
        service.loginWithEmailPassword("fail@example.com", "wrongpass")
      ).rejects.toThrow("Invalid credentials");
    });
  });
  
  