-- Posiciones
INSERT INTO JobPosition (ID, Name) VALUES
(1, 'Agente de Ventas'),
(2, 'Gerente de Ventas');

-- Equipos
INSERT INTO Team (TeamName) VALUES
('Equipo Gominola'),
('Equipo Sigma');

-- Usuarios (8 en total, 4 por equipo)

INSERT INTO [User] (ID, Name, LastName, PhoneNumber, JoiningDate, IDJobPos, Education, ProfilePic, TeamID) VALUES
('ana.gomez@empresa.com', 'Ana', 'Gómez', '555-1234', '2024-01-15', 1, 'Licenciatura en Marketing', NULL, 1),
('luis.perez@empresa.com', 'Luis', 'Pérez', '555-5678', '2024-01-20', 1, 'Ingeniería Comercial', NULL, 1),
('carla.sanchez@empresa.com', 'Carla', 'Sánchez', '555-8765', '2024-01-25', 1, 'Lic. en Administración', NULL, 1),
('jorge.lopez@empresa.com', 'Jorge', 'López', '555-4321', '2024-01-30', 2, 'MBA', NULL, 1), -- Gerente Gominola

('sofia.martinez@empresa.com', 'Sofía', 'Martínez', '555-1111', '2024-02-05', 1, 'Lic. en Comunicación', NULL, 2),
('diego.ramirez@empresa.com', 'Diego', 'Ramírez', '555-2222', '2024-02-10', 1, 'Lic. en Mercadotecnia', NULL, 2),
('valeria.fernandez@empresa.com', 'Valeria', 'Fernández', '555-3333', '2024-02-15', 1, 'Lic. en Publicidad', NULL, 2),
('miguel.torres@empresa.com', 'Miguel', 'Torres', '555-4444', '2024-02-20', 2, 'MBA', NULL, 2); -- Gerente Sigma

-- Admins (los gerentes)
INSERT INTO Admin (IDUser, IDTeam) VALUES
('jorge.lopez@empresa.com', 1),
('miguel.torres@empresa.com', 2);

INSERT INTO Enterprise (Name, Description, Industry, WebPage, Location) VALUES
('TechNova', 'Empresa de soluciones tecnológicas enfocadas en innovación', 'Tecnología', 'https://www.technova.com', 'Ciudad de México'),
('EcoVida', 'Distribuidora de productos ecológicos y sustentables', 'Ecológica', 'https://www.ecovida.mx', 'Guadalajara'),
('FinSmart', 'Servicios financieros inteligentes y digitales', 'Finanzas', 'https://www.finsmart.com', 'Monterrey'),
('SaludTotal', 'Proveedor de servicios de salud integral y preventiva', 'Salud', 'https://www.saludtotal.mx', 'Querétaro'),
('Constructiva', 'Empresa dedicada a construcción e infraestructura', 'Construcción', 'https://www.constructiva.com', 'Puebla'),
('EduPlus', 'Plataforma de educación online para empresas y estudiantes', 'Educación', 'https://www.eduplus.mx', 'León');

-- Contactos para Ana Gómez
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Ricardo', 'Mendoza', 'ricardo.mendoza@client.com', '555-1001', '2025-03-01', 1, 'ana.gomez@empresa.com'),
('Elena', 'Ríos', 'elena.rios@client.com', '555-1002', '2025-03-02', 2, 'ana.gomez@empresa.com'),
('Tomás', 'Soto', 'tomas.soto@client.com', '555-1003', '2025-03-03', 3, 'ana.gomez@empresa.com'),
('Laura', 'Mejía', 'laura.mejia@client.com', '555-1004', '2025-03-04', 4, 'ana.gomez@empresa.com'),
('Carlos', 'Villalobos', 'carlos.villa@client.com', '555-1005', '2025-03-05', 5, 'ana.gomez@empresa.com');

-- Contactos para Luis Pérez
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Mariana', 'Nava', 'mariana.nava@client.com', '555-1011', '2025-03-01', 2, 'luis.perez@empresa.com'),
('Hugo', 'Ramírez', 'hugo.ramirez@client.com', '555-1012', '2025-03-02', 3, 'luis.perez@empresa.com'),
('Gabriela', 'Cano', 'gabriela.cano@client.com', '555-1013', '2025-03-03', 4, 'luis.perez@empresa.com'),
('Alberto', 'Reyes', 'alberto.reyes@client.com', '555-1014', '2025-03-04', 5, 'luis.perez@empresa.com'),
('Paula', 'Estrada', 'paula.estrada@client.com', '555-1015', '2025-03-05', 6, 'luis.perez@empresa.com');

-- Contactos para Carla Sánchez
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Javier', 'Durán', 'javier.duran@client.com', '555-1021', '2025-03-01', 3, 'carla.sanchez@empresa.com'),
('Cecilia', 'Ortega', 'cecilia.ortega@client.com', '555-1022', '2025-03-02', 4, 'carla.sanchez@empresa.com'),
('Esteban', 'Cruz', 'esteban.cruz@client.com', '555-1023', '2025-03-03', 5, 'carla.sanchez@empresa.com'),
('Rocío', 'Blanco', 'rocio.blanco@client.com', '555-1024', '2025-03-04', 6, 'carla.sanchez@empresa.com'),
('Iván', 'Figueroa', 'ivan.figueroa@client.com', '555-1025', '2025-03-05', 1, 'carla.sanchez@empresa.com');

-- Contactos para Sofía Martínez
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Natalia', 'Guzmán', 'natalia.guzman@client.com', '555-1031', '2025-03-01', 4, 'sofia.martinez@empresa.com'),
('Fernando', 'Ramos', 'fernando.ramos@client.com', '555-1032', '2025-03-02', 5, 'sofia.martinez@empresa.com'),
('Lucía', 'Herrera', 'lucia.herrera@client.com', '555-1033', '2025-03-03', 6, 'sofia.martinez@empresa.com'),
('Rubén', 'Zamora', 'ruben.zamora@client.com', '555-1034', '2025-03-04', 1, 'sofia.martinez@empresa.com'),
('Andrea', 'Delgado', 'andrea.delgado@client.com', '555-1035', '2025-03-05', 2, 'sofia.martinez@empresa.com');

-- Contactos para Diego Ramírez
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Manuel', 'Vargas', 'manuel.vargas@client.com', '555-1041', '2025-03-01', 5, 'diego.ramirez@empresa.com'),
('Isabel', 'Montes', 'isabel.montes@client.com', '555-1042', '2025-03-02', 6, 'diego.ramirez@empresa.com'),
('Santiago', 'Del Río', 'santiago.delrio@client.com', '555-1043', '2025-03-03', 1, 'diego.ramirez@empresa.com'),
('Lorena', 'Peña', 'lorena.pena@client.com', '555-1044', '2025-03-04', 2, 'diego.ramirez@empresa.com'),
('Emilio', 'Suárez', 'emilio.suarez@client.com', '555-1045', '2025-03-05', 3, 'diego.ramirez@empresa.com');

-- Contactos para Valeria Fernández
INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, IDEnterprise, IDUser) VALUES
('Daniela', 'Vega', 'daniela.vega@client.com', '555-1051', '2025-03-01', 6, 'valeria.fernandez@empresa.com'),
('Óscar', 'Galindo', 'oscar.galindo@client.com', '555-1052', '2025-03-02', 1, 'valeria.fernandez@empresa.com'),
('Verónica', 'Campos', 'veronica.campos@client.com', '555-1053', '2025-03-03', 2, 'valeria.fernandez@empresa.com'),
('Martín', 'Aguilar', 'martin.aguilar@client.com', '555-1054', '2025-03-04', 3, 'valeria.fernandez@empresa.com'),
('Julieta', 'Salas', 'julieta.salas@client.com', '555-1055', '2025-03-05', 4, 'valeria.fernandez@empresa.com');

-- Productos
INSERT INTO Product (RefNum, Name, Description, UnitaryPrice, Commission, ProductSheetURL, CreationDate) VALUES
('PRD-001', 'Sensor Ultrasonico HC-SR04', 'Sensor de distancia por ultrasonido para robótica y automatización', 45.00, 5.00, 'https://mixelectronica.com/products/ultrasonico', '2025-04-01'),
('PRD-002', 'Arduino UNO R3', 'Placa de desarrollo compatible con proyectos de electrónica y robótica', 300.00, 20.00, 'https://mixelectronica.com/products/arduino-uno', '2025-04-01'),
('PRD-003', 'Motor DC 6V', 'Motor de corriente directa para aplicaciones mecánicas ligeras', 60.00, 6.00, 'https://mixelectronica.com/products/motor-dc', '2025-04-01'),
('PRD-004', 'Módulo L298N', 'Driver de motor dual para controlar motores DC o paso a paso', 95.00, 8.00, 'https://mixelectronica.com/products/l298n', '2025-04-01'),
('PRD-005', 'Raspberry Pi 4 4GB', 'Mini computadora para proyectos de robótica, IA y domótica', 1900.00, 150.00, 'https://mixelectronica.com/products/raspberry-pi4', '2025-04-01'),
('PRD-006', 'Servomotor SG90', 'Micro servo de 180° para proyectos de precisión', 75.00, 7.00, 'https://mixelectronica.com/products/sg90', '2025-04-01'),
('PRD-007', 'Sensor de Línea TCRT5000', 'Sensor infrarrojo para seguimiento de líneas en robots móviles', 40.00, 4.00, 'https://mixelectronica.com/products/tcrt5000', '2025-04-01'),
('PRD-008', 'Kit de Brazo Robótico 4DOF', 'Kit mecánico para prácticas de robótica', 480.00, 40.00, 'https://mixelectronica.com/products/brazo-robotico', '2025-04-01'),
('PRD-009', 'Módulo Bluetooth HC-05', 'Comunicación inalámbrica entre dispositivos y microcontroladores', 80.00, 6.00, 'https://mixelectronica.com/products/hc-05', '2025-04-01'),
('PRD-010', 'Cámara OV7670', 'Módulo de cámara para visión por computadora con Arduino o Raspberry', 130.00, 10.00, 'https://mixelectronica.com/products/ov7670', '2025-04-01'),
('PRD-011', 'IMU MPU6050', 'Sensor de aceleración y giroscopio de 6 ejes', 95.00, 9.00, 'https://mixelectronica.com/products/mpu6050', '2025-04-01'),
('PRD-012', 'Pantalla OLED 0.96"', 'Pantalla gráfica monocroma para microcontroladores', 110.00, 8.00, 'https://mixelectronica.com/products/oled', '2025-04-01'),
('PRD-013', 'Kit Básico de Electrónica', 'Conjunto de componentes básicos para principiantes', 350.00, 25.00, 'https://mixelectronica.com/products/kit-electronica', '2025-04-01'),
('PRD-014', 'Sensor de Gas MQ-2', 'Detector de gases inflamables para proyectos de seguridad', 65.00, 6.00, 'https://mixelectronica.com/products/mq2', '2025-04-01'),
('PRD-015', 'Shield de Expansión para Arduino', 'Placa de expansión para facilitar conexiones y prototipado', 120.00, 10.00, 'https://mixelectronica.com/products/shield', '2025-04-01');

-- Fases de ventas
INSERT INTO Phase (Name) VALUES
('Prospección'),
('Contacto Inicial'),
('Calificación'),
('Propuesta'),
('Negociación'),
('Cierre'),
('Postventa');

-- Ventas

-- primero encontrar id de los contactos
('Ricardo', 'Mendoza', 'ricardo.mendoza@client.com', '555-1001', '2025-03-01', 1, 'ana.gomez@empresa.com'),
('Elena', 'Ríos', 'elena.rios@client.com', '555-1002', '2025-03-02', 2, 'ana.gomez@empresa.com'),
('Tomás', 'Soto', 'tomas.soto@client.com', '555-1003', '2025-03-03', 3, 'ana.gomez@empresa.com'),
('Laura', 'Mejía', 'laura.mejia@client.com', '555-1004', '2025-03-04', 4, 'ana.gomez@empresa.com'),
('Carlos', 'Villalobos', 'carlos.villa@client.com', '555-1005', '2025-03-05', 5, 'ana.gomez@empresa.com');

-- insertar ventas
INSERT INTO Sale (IDUser, IDContact, StartDate, EndDate, IDPhase)
VALUES
('ana.gomez@empresa.com', 1, '2025-03-10', '2025-04-02', 6),
('ana.gomez@empresa.com', 2, '2025-03-11', '2025-04-02', 6),
('ana.gomez@empresa.com', 3, '2025-03-12', '2025-04-03', 6),
('ana.gomez@empresa.com', 4, '2025-03-13', '2025-04-04', 6),
('ana.gomez@empresa.com', 5, '2025-03-14', '2025-04-05', 6); --revisar contactos id