CREATE DATABASE MIXtesting;

USE MIXtesting;


CREATE TABLE [Team] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [TeamName] varchar(30)
);

CREATE TABLE [JobPosition] (
  [ID] integer PRIMARY KEY IDENTITY(1,1),
  [Name] varchar(50),
  [IDTeam] integer,
  FOREIGN KEY ([IDTeam]) REFERENCES [Team] ([ID])
);

CREATE TABLE [User] (
  [ID] varchar(255) NOT NULL PRIMARY KEY,
  [Name] varchar(100),
  [LastName] varchar(100),
  [PhoneNumber] varchar(30),
  [JoiningDate] date DEFAULT GETDATE(),
  [IDJobPosition] integer NOT NULL,
  [Education] varchar(255),
  [ProfilePic] varbinary(max),
  FOREIGN KEY ([IDJobPosition]) REFERENCES [JobPosition] ([ID]),
);

CREATE TABLE [Admin] (
  [IDUser] varchar(255) NOT NULL PRIMARY KEY,
  [IDTeam] integer NOT NULL,
  FOREIGN KEY ([IDUser]) REFERENCES [User] ([ID]),
  FOREIGN KEY ([IDTeam]) REFERENCES [Team] ([ID])
);

CREATE TABLE [Enterprise] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [Name] varchar(100),
  [Description] varchar(255),
  [Industry] varchar(50),
  [WebPage] varchar(255),
  [Location] varchar(255)
);

CREATE TABLE [Contact] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [Name] varchar(100),
  [LastName] varchar(100),
  [Email] varchar(255),
  [PhoneNumber] varchar(30),
  [CreationDate] date DEFAULT GETDATE(),
  [IDEnterprise] integer NOT NULL,
  [IDUser] varchar(255) NOT NULL,
  FOREIGN KEY ([IDEnterprise]) REFERENCES [Enterprise] ([ID]),
  FOREIGN KEY ([IDUser]) REFERENCES [User] ([ID])
);

CREATE TABLE [Product] (
  [RefNum] varchar(50) PRIMARY KEY,
  [Name] varchar(50),
  [Description] varchar(255),
  [UnitaryPrice] float,
  [Commission] float,
  [ProductSheetURL] varchar(255),
  [CreationDate] date DEFAULT GETDATE()
);

CREATE TABLE [Phase] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [Name] varchar(50)
);

CREATE TABLE [Sale] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [IDUser] varchar(255) NOT NULL,
  [IDContact] integer NOT NULL,
  [StartDate] date DEFAULT GETDATE(),
  [IDPhase] integer NOT NULL,
  FOREIGN KEY ([IDUser]) REFERENCES [User] ([ID]),
  FOREIGN KEY ([IDContact]) REFERENCES [Contact] ([ID]),
  FOREIGN KEY ([IDPhase]) REFERENCES [Phase] ([ID])
);

CREATE TABLE [SaleArticle] (
  [IDSale] integer,
  [IDProduct] varchar(50),
  [Quantity] integer,
  PRIMARY KEY ([IDSale], [IDProduct]),
  FOREIGN KEY ([IDSale]) REFERENCES [Sale] ([ID]),
  FOREIGN KEY ([IDProduct]) REFERENCES [Product] ([RefNum])
);

-- Para métricas

CREATE TABLE [Award] (
  [ID] integer IDENTITY(1,1) PRIMARY KEY,
  [Name] varchar(30)
);

CREATE TABLE [UserAward] (
  [IDUser] varchar(255) NOT NULL,
  [IDAward] integer,
  [WinDate] datetime DEFAULT GETDATE(),
  PRIMARY KEY ([IDUser], [WinDate]),
  FOREIGN KEY ([IDUser]) REFERENCES [User] ([ID]),
  FOREIGN KEY ([IDAward]) REFERENCES [Award] ([ID])
);

CREATE TABLE [SaleLifespan] (
  [IDSale] integer,
  [SalePhase] integer,
  [ChangeDate] date DEFAULT GETDATE(),
  PRIMARY KEY ([IDSale], [SalePhase]),
  FOREIGN KEY ([IDSale]) REFERENCES [Sale] ([ID]),
  FOREIGN KEY ([SalePhase]) REFERENCES [Phase] ([ID])
);

-- Juego

CREATE TABLE [Score] (
  [IDUser] varchar(255) NOT NULL PRIMARY KEY,
  [Score] integer,
  FOREIGN KEY ([IDUser]) REFERENCES [User] ([ID])
);

CREATE TABLE [Quiz] (
  [IDQuiz] integer IDENTITY(1,1) PRIMARY KEY,
  [json] varchar(MAX),
  [IDTeam] integer,
  FOREIGN KEY ([IDTeam]) REFERENCES [Team] ([ID])
);
