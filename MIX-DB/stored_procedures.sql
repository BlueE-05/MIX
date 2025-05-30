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


----------------Eliminar una venta en particular por su ID
CREATE PROCEDURE sp_DeleteSaleAndRelatedData
    @SaleID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- 1. Eliminar registros de SaleLifespan (historial de fases)
        DELETE FROM SaleLifespan 
        WHERE IDSale = @SaleID;
        
        -- 2. Eliminar artículos asociados a la venta en SaleArticle
        DELETE FROM SaleArticle 
        WHERE IDSale = @SaleID;
        
        -- 3. Finalmente eliminar la venta principal
        DELETE FROM Sale 
        WHERE ID = @SaleID;
        
        COMMIT TRANSACTION;
        
        SELECT 'Success' AS Result, 'Sale and all related data deleted successfully' AS Message;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            
        SELECT 'Error' AS Result, 
               ERROR_MESSAGE() AS Message,
               ERROR_NUMBER() AS ErrorNumber,
               ERROR_SEVERITY() AS ErrorSeverity,
               ERROR_STATE() AS ErrorState;
    END CATCH;
END;



---REvisar las ventas especificas de un usuario que fueron modificadas por ultima vez en el mes actual



----------------Obtener el total de ventas de un equipo
CREATE PROCEDURE GetTeamSalesReport
    @UserEmail NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @UserTeamID INT = (
	SELECT 
		jp.IDTeam 
	FROM [User] u
	INNER JOIN JobPosition jp ON u.IDJobPosition = jp.ID
	WHERE u.IDEmail = @UserEmail
	);
    
    -- Validate if user exists
    IF @UserTeamID IS NULL
    BEGIN
        RAISERROR('User not found', 16, 1);
        RETURN;
    END
    
	SELECT 
		u.IDEmail,
		u.Name + ' ' + u.LastName AS TeamMember,
		COUNT(DISTINCT s.ID) AS TotalSalesCompleted,
		SUM(sa.Quantity * p.UnitaryPrice) AS TotalSalesAmount,
		AVG(sa.Quantity * p.UnitaryPrice) AS AverageSaleAmount,
		MAX(s.StartDate) AS LastSaleDate
	FROM 
		[User] u
	INNER JOIN 
		JobPosition jp ON u.IDJobPosition = jp.ID
	LEFT JOIN 
		Sale s ON u.IDEmail = s.IDUser AND s.IDPhase = 5
	LEFT JOIN 
		SaleArticle sa ON s.ID = sa.IDSale
	LEFT JOIN 
		Product p ON sa.IDProduct = p.RefNum
	WHERE 
		jp.IDTeam = @UserTeamID
		AND u.IDEmail IN (SELECT IDUser FROM Sale WHERE IDPhase = 5)
		AND MONTH(s.StartDate) = MONTH(GETDATE())
		AND YEAR(s.StartDate) = YEAR(GETDATE())
	GROUP BY 
		u.IDEmail, u.Name, u.LastName
	ORDER BY 
		TotalSalesAmount DESC;
END
--- Ejemplo de ejecución


-----------Obtener la información de ventas (ventas cerradas, comsiones) de cada miembro de un equipo 
CREATE PROCEDURE TeamSalesReport
    @UserEmail NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserTeamID INT;

    SELECT @UserTeamID = jp.IDTeam
    FROM [User] u
    INNER JOIN JobPosition jp ON u.IDJobPosition = jp.ID
    WHERE u.IDEmail = @UserEmail;

    -- Validate if user exists
    IF @UserTeamID IS NULL
    BEGIN
        RAISERROR('User not found or no team assigned', 16, 1);
        RETURN;
    END

    SELECT 
        u.IDEmail,
        u.Name + ' ' + u.LastName AS TeamMember,
        COUNT(DISTINCT s.ID) AS TotalSalesCompleted,
        SUM(sa.Quantity * p.UnitaryPrice * p.Commission) AS ComisionTotal
    FROM 
        [User] u
    INNER JOIN 
        JobPosition jp ON u.IDJobPosition = jp.ID
    LEFT JOIN 
        Sale s ON u.IDEmail = s.IDUser AND s.IDPhase = 5
    LEFT JOIN 
        SaleArticle sa ON s.ID = sa.IDSale
    LEFT JOIN 
        Product p ON sa.IDProduct = p.RefNum
    WHERE 
        jp.IDTeam = @UserTeamID
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
    GROUP BY 
        u.IDEmail, u.Name, u.LastName
    ORDER BY 
        ComisionTotal DESC;
END



-----Obtener los dias del mes actual
CREATE PROCEDURE getDiasDelMesActual 
 AS 
 BEGIN     
 DECLARE @FechaActual DATE = GETDATE();     
 DECLARE @PrimerDiaMes DATE = DATEFROMPARTS(YEAR(@FechaActual), MONTH(@FechaActual), 1);     
 DECLARE @UltimoDiaMes DATE = EOMONTH(@FechaActual);      -- Consulta para generar todos los días del mes actual     
 WITH Secuencia AS (         SELECT 0 AS n         UNION ALL         SELECT n + 1         FROM Secuencia         
 WHERE n < DATEDIFF(day, @PrimerDiaMes, @UltimoDiaMes)     )     
 SELECT          
 DATEADD(day, n, @PrimerDiaMes) AS Fecha     
 FROM          Secuencia     
 OPTION (MAXRECURSION 31); -- Aseguramos suficiente recursión para un mes completo 
 END;



-----Obtener de cada dia del mes las ventas con modificacion a fase 5 de un usuario en específico
CREATE PROCEDURE sp_GetDailyClosedSalesByUser
    @UserEmail VARCHAR(255)
AS
BEGIN
    CREATE TABLE #DiasMes (Fecha DATE);
    
    INSERT INTO #DiasMes
    EXEC getDiasDelMesActual;
    
    SELECT 
        dm.Fecha,
        COUNT(sl.IDSale) AS VentasCerradas,
        DAY(dm.Fecha) AS DiaDelMes,
        DATENAME(WEEKDAY, dm.Fecha) AS DiaSemana
    FROM 
        #DiasMes dm
    LEFT JOIN (
        SELECT 
            sl.IDSale,
            CAST(sl.ChangeDate AS DATE) AS FechaCambio,
            sl.SalePhase
        FROM (
            SELECT 
                sl.IDSale,
                sl.SalePhase,
                sl.ChangeDate,
                ROW_NUMBER() OVER (PARTITION BY sl.IDSale ORDER BY sl.ChangeDate DESC) AS rn
            FROM SaleLifespan sl
            JOIN Sale s ON sl.IDSale = s.ID
            WHERE s.IDUser = @UserEmail -- Filtro por usuario
        ) sl
        WHERE sl.rn = 1
        AND sl.SalePhase = 5
    ) sl ON dm.Fecha = sl.FechaCambio
    GROUP BY 
        dm.Fecha
    ORDER BY 
        dm.Fecha;
    
    DROP TABLE #DiasMes;
END;



---obtener de cada dia del mes las ventas con modificacion a fase 5 de un equipo
CREATE PROCEDURE sp_GetDailyClosedSalesByTeam
    @UserEmail VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Obtener el ID del equipo del usuario
    DECLARE @TeamID INT;
    
    SELECT @TeamID = jp.IDTeam
    FROM [User] u
    INNER JOIN JobPosition jp ON u.IDJobPosition = jp.ID
    WHERE u.IDEmail = @UserEmail;
    
    -- Validar si el usuario o equipo existen
    IF @TeamID IS NULL
    BEGIN
        SELECT 'Usuario no encontrado o sin equipo asignado' AS Resultado;
        RETURN;
    END;
    
    -- Crear tabla temporal con los días del mes
    CREATE TABLE #DiasMes (Fecha DATE);
    
    INSERT INTO #DiasMes
    EXEC getDiasDelMesActual;  -- Asumo que este SP devuelve todas las fechas del mes actual
    
    -- Consulta principal
    SELECT 
        dm.Fecha,
        COUNT(sl.IDSale) AS VentasCerradas,
        DAY(dm.Fecha) AS DiaDelMes,
        DATENAME(WEEKDAY, dm.Fecha) AS DiaSemana,
        (SELECT TeamName FROM Team WHERE ID = @TeamID) AS Equipo
    FROM 
        #DiasMes dm
    LEFT JOIN (
        -- Subconsulta: Último cambio de fase de cada venta
        SELECT 
            sl.IDSale,
            CAST(sl.ChangeDate AS DATE) AS FechaCambio,
            sl.SalePhase
        FROM (
            SELECT 
                sl.IDSale,
                sl.SalePhase,
                sl.ChangeDate,
                ROW_NUMBER() OVER (PARTITION BY sl.IDSale ORDER BY sl.ChangeDate DESC) AS rn
            FROM SaleLifespan sl
            INNER JOIN Sale s ON sl.IDSale = s.ID
            INNER JOIN [User] u ON s.IDUser = u.IDEmail
            INNER JOIN JobPosition jp ON u.IDJobPosition = jp.ID
            WHERE jp.IDTeam = @TeamID
        ) sl
        WHERE sl.rn = 1
          AND sl.SalePhase = 5 -- Cerradas
    ) sl ON dm.Fecha = sl.FechaCambio
    GROUP BY 
        dm.Fecha
    ORDER BY 
        dm.Fecha;
    
    DROP TABLE #DiasMes;
END;





------Update a la fase de una venta
CREATE PROCEDURE sp_UpdateSalePhase
    @SaleID INT,
    @NewPhaseID INT
AS
BEGIN
    DECLARE @ChangeDate DATETIME = GETDATE();
    
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- 1. Actualizar la fase en la tabla Sale
        UPDATE Sale
        SET IDPhase = @NewPhaseID
        WHERE ID = @SaleID;
        
        -- 2. Registrar el cambio en el historial (SaleLifespan)
        INSERT INTO SaleLifespan (IDSale, SalePhase, ChangeDate)
        VALUES (@SaleID, @NewPhaseID, @ChangeDate);
        
        COMMIT TRANSACTION;
        
        SELECT 'Success' AS Result, 'Fase actualizada correctamente' AS Message;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        
        SELECT 'Error' AS Result, 
               'Error al actualizar la fase: ' + ERROR_MESSAGE() AS Message,
               ERROR_NUMBER() AS ErrorNumber,
               ERROR_LINE() AS ErrorLine;
    END CATCH;
END;