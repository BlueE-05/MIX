import { UserController } from "../controllers/user.controller";
import { Auth0Service } from "../services/auth0.service";
import { UserDbService } from "../db/user";
import { Request, Response } from "express";

const mockAuth0Service = {
  userExists: jest.fn(),
  createUser: jest.fn(),
  loginWithEmailPassword: jest.fn(),
} as unknown as Auth0Service;

const mockUserDbService = {
  createUser: jest.fn(),
} as unknown as UserDbService;

const controller = new UserController(mockAuth0Service, mockUserDbService);

describe("UserController.signup", () => {

  it("Debería retornar 400 si falta email o password", async () => {
    const req = { body: { Email: "", Password: "" } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email and password are required" });
  });
  it("Debería registrar usuario exitosamente si los datos son válidos", async () => {
    const req = {
      body: {
        Email: "test@example.com",
        Password: "secure123",
        Name: "Juan",
        LastName: "Pérez",
        PhoneNumber: "123456789",
        BirthDate: "2000-01-01",
        Education: "Universidad",
        ProfilePic: null,
        idTeam: "2",
        JobPosition: "Desarrollador"
      }
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    mockAuth0Service.userExists = jest.fn().mockResolvedValue(false);
    mockAuth0Service.createUser = jest.fn().mockResolvedValue({ email_verified: true });
    mockAuth0Service.loginWithEmailPassword = jest.fn().mockResolvedValue({
      access_token: "mock_access_token",
      id_token: "mock_id_token"
    });
  
    mockUserDbService.createUser = jest.fn().mockResolvedValue(undefined);
  
    await controller.signup(req, res);
  
    expect(mockAuth0Service.userExists).toHaveBeenCalledWith("test@example.com");
    expect(mockAuth0Service.createUser).toHaveBeenCalled();
    expect(mockUserDbService.createUser).toHaveBeenCalled();
    expect(mockAuth0Service.loginWithEmailPassword).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User created successfully",
      access_token: "mock_access_token",
      id_token: "mock_id_token"
    });
  });
  it("Debería retornar 409 si el email ya existe en Auth0", async () => {
    const req = {
      body: {
        Email: "usuario_existente@example.com",
        Password: "password123",
        Name: "Ana",
        LastName: "López",
        PhoneNumber: "987654321",
        BirthDate: "1999-05-05",
        Education: "Instituto",
        ProfilePic: null,
        idTeam: "1",
        JobPosition: "QA"
      }
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    mockAuth0Service.userExists = jest.fn().mockResolvedValue(true);
  
    await controller.signup(req, res);
  
    expect(mockAuth0Service.userExists).toHaveBeenCalledWith("usuario_existente@example.com");
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Email already exists in Auth0" });
  });
  it("Debería retornar 500 si Auth0.createUser lanza un error", async () => {
    const req = {
      body: {
        Email: "nuevo_usuario@example.com",
        Password: "pass1234",
        Name: "Carlos",
        LastName: "Gómez",
        PhoneNumber: "000123456",
        BirthDate: "1995-03-15",
        Education: "Secundaria",
        ProfilePic: null,
        idTeam: "3",
        JobPosition: "Analista"
      }
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    mockAuth0Service.userExists = jest.fn().mockResolvedValue(false);
    mockAuth0Service.createUser = jest.fn().mockRejectedValue({
      response: { data: "Auth0 Error al crear usuario" }
    });
  
    await controller.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error creating user" });
  });
  it("Debería retornar 500 si Auth0.loginWithEmailPassword lanza error", async () => {
    const req = {
      body: {
        Email: "loginfail@example.com",
        Password: "fail123",
        Name: "Lucía",
        LastName: "Silva",
        PhoneNumber: "321654987",
        BirthDate: "1992-11-11",
        Education: "Universidad",
        ProfilePic: null,
        idTeam: "4",
        JobPosition: "Tester"
      }
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    mockAuth0Service.userExists = jest.fn().mockResolvedValue(false);
    mockAuth0Service.createUser = jest.fn().mockResolvedValue({ email_verified: true });
    mockUserDbService.createUser = jest.fn().mockResolvedValue(undefined);
    mockAuth0Service.loginWithEmailPassword = jest.fn().mockRejectedValue({
      response: { data: "Auth0 login error" }
    });
  
    await controller.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error creating user" });
  });
  it("Debería retornar 500 si guardar el usuario en la base de datos falla", async () => {
    const req = {
      body: {
        Email: "dbfail@example.com",
        Password: "faildb123",
        Name: "Roberto",
        LastName: "Díaz",
        PhoneNumber: "456789123",
        BirthDate: "1985-07-21",
        Education: "Técnico",
        ProfilePic: null,
        idTeam: "5",
        JobPosition: "Soporte"
      }
    } as Request;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  
    mockAuth0Service.userExists = jest.fn().mockResolvedValue(false);
    mockAuth0Service.createUser = jest.fn().mockResolvedValue({ email_verified: true });
    mockUserDbService.createUser = jest.fn().mockRejectedValue(new Error("DB error"));
  
    await controller.signup(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error creating user" });
  });
});

describe("UserController.getProfile", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  it("Debería retornar 400 si no hay sub en req.auth", async () => {
    const req = { auth: {} } as any;

    await controller.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Token sin sub" });
  });

  it("Debería retornar 500 si falla el Auth0Service", async () => {
    const req = { auth: { sub: "auth0|123" } } as any;

    mockAuth0Service.getUserBySub = jest.fn().mockRejectedValue(new Error("Auth0 error"));

    await controller.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error interno" });
  });

  it("Debería retornar 404 si el usuario no existe en DB", async () => {
    const req = { auth: { sub: "auth0|456" } } as any;

    mockAuth0Service.getUserBySub = jest.fn().mockResolvedValue({ email: "notfound@example.com" });
    mockUserDbService.getUserByEmail = jest.fn().mockResolvedValue(null);

    await controller.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" });
  });

  it("Debería retornar 200 si el usuario existe", async () => {
    const req = { auth: { sub: "auth0|789" } } as any;
    const mockUser = { ID: 1, Email: "real@example.com", Name: "Juan" };

    mockAuth0Service.getUserBySub = jest.fn().mockResolvedValue({ email: "real@example.com" });
    mockUserDbService.getUserByEmail = jest.fn().mockResolvedValue(mockUser);

    await controller.getProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
});

