---Crear una nueva venta con un solo producto
CREATE PROCEDURE sp_CreateNewSale
    @UserID varchar(255),
    @ContactID int,
    @PhaseID int,
    @ProductID varchar(50),
    @Quantity int
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @NewSaleID INT;
        
        -- 1. Insertar el registro en la tabla Sale
        INSERT INTO Sale (IDUser, IDContact, IDPhase, StartDate)
        VALUES (@UserID, @ContactID, @PhaseID, GETDATE());
        
        -- Obtener el ID de la venta recién creada
        SET @NewSaleID = SCOPE_IDENTITY();
        
        -- 2. Insertar el artículo asociado a la venta en SaleArticle
        INSERT INTO SaleArticle (IDSale, IDProduct, Quantity)
        VALUES (@NewSaleID, @ProductID, @Quantity);
        
        -- 3. Registrar el cambio de fase en SaleLifespan
        INSERT INTO SaleLifespan (IDSale, SalePhase, ChangeDate)
        VALUES (@NewSaleID, @PhaseID, GETDATE());
        
        COMMIT TRANSACTION;
        
        -- Retornar el ID de la nueva venta
        SELECT @NewSaleID AS NewSaleID;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        -- Retornar información del error
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState,
            ERROR_PROCEDURE() AS ErrorProcedure,
            ERROR_LINE() AS ErrorLine,
            ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END;

-- Ejemplo de llamada al procedimiento
EXEC sp_CreateNewSale 
    @UserID = 'ana.gomez@empresa.com',
    @ContactID = 2,
    @PhaseID = 1,
    @ProductID = 'PRD-004',
    @Quantity = 5;

--------------------------Crear una nueva venta con varios productos
CREATE PROCEDURE sp_CreateNewSaleMultProds
    @UserID varchar(255),
    @ContactID int,
    @PhaseID int,
    @ProductsJSON varchar(MAX)  -- Formato: [{"ProductID":"REF1","Quantity":2},{"ProductID":"REF2","Quantity":1}]
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @NewSaleID INT;
        
        -- 1. Insertar el registro en la tabla Sale
        INSERT INTO Sale (IDUser, IDContact, IDPhase, StartDate)
        VALUES (@UserID, @ContactID, @PhaseID, GETDATE());
        
        -- Obtener el ID de la venta recién creada
        SET @NewSaleID = SCOPE_IDENTITY();
        
        -- 2. Insertar los artículos desde el JSON
        INSERT INTO SaleArticle (IDSale, IDProduct, Quantity)
        SELECT @NewSaleID, ProductID, Quantity
        FROM OPENJSON(@ProductsJSON)
        WITH (
            ProductID varchar(50) '$.ProductID',
            Quantity int '$.Quantity'
        );
        
        -- 3. Registrar el cambio de fase en SaleLifespan
        INSERT INTO SaleLifespan (IDSale, SalePhase, ChangeDate)
        VALUES (@NewSaleID, @PhaseID, GETDATE());
        
        COMMIT TRANSACTION;
        
        -- Retornar el ID de la nueva venta
        SELECT @NewSaleID AS NewSaleID;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 
            ERROR_NUMBER() AS ErrorNumber,
            ERROR_SEVERITY() AS ErrorSeverity,
            ERROR_STATE() AS ErrorState,
            ERROR_PROCEDURE() AS ErrorProcedure,
            ERROR_LINE() AS ErrorLine,
            ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END;

-- Ejemplo de llamada al procedimiento
EXEC sp_CreateNewSaleMultProds
    @UserID = 'ana.gomez@empresa.com',
    @ContactID = 2,
    @PhaseID = 1,
    @ProductsJSON = '[{"ProductID":"PRD-001","Quantity":2},{"ProductID":"PRD-002","Quantity":1}]';