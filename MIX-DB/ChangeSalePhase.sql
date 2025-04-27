CREATE PROCEDURE ChangeSalePhase
    @SaleID INT,
    @PhaseName VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar que la fase existe
    IF EXISTS (SELECT 1 FROM [Phase] WHERE [Name] = @PhaseName)
    BEGIN
        -- Actualizar la venta con el nuevo IDPhase
        UPDATE S
        SET S.IDPhase = P.ID
        FROM [Sale] S
        INNER JOIN [Phase] P ON P.Name = @PhaseName
        WHERE S.ID = @SaleID;
    END
    ELSE
    BEGIN
        -- Lanzar error si no existe la fase
        THROW 50001, 'Phase name not found.', 1;
    END
END;