CREATE TRIGGER AssignAwardOnSalePhaseUpdate
ON [Sale]
AFTER UPDATE
AS
BEGIN
    -- Ejecuta solo si la fase nueva es 5
    IF EXISTS (
        SELECT 1
        FROM INSERTED
        WHERE IDPhase = 5
    )
    BEGIN
        DECLARE @IDUser varchar(255), @TotalSales decimal(18,2), @Month INT, @Year INT, @IDAward INT;

        -- Tomamos una de las filas afectadas (puedes adaptar para múltiples si lo necesitas)
        SELECT 
            @IDUser = s.IDUser,
            @Month = MONTH(s.EndDate),
            @Year = YEAR(s.EndDate)
        FROM INSERTED i
        JOIN [Sale] s ON s.ID = i.ID;

        -- Total vendido por el usuario en el mes de esa venta finalizada
        SELECT 
            @TotalSales = SUM(sa.Quantity * p.UnitaryPrice)
        FROM [Sale] s
        JOIN [SaleArticle] sa ON sa.IDSale = s.ID
        JOIN [Product] p ON sa.IDProduct = p.RefNum
        WHERE s.IDUser = @IDUser
        AND s.IDPhase = 5 -- solo ventas finalizadas
        AND MONTH(s.EndDate) = @Month
        AND YEAR(s.EndDate) = @Year;

        -- Lógica para asignar premio según el total vendido
        IF @TotalSales >= 100000
            SET @IDAward = 6; -- 100K Award
        ELSE IF @TotalSales >= 50000
            SET @IDAward = 5;
        ELSE IF @TotalSales >= 25000
            SET @IDAward = 4;
        ELSE IF @TotalSales >= 10000
            SET @IDAward = 3;
        ELSE IF @TotalSales >= 5000
            SET @IDAward = 2;
        ELSE IF @TotalSales >= 1000
            SET @IDAward = 1;

        -- Solo insertamos si hay premio
        IF @IDAward IS NOT NULL
        BEGIN
            INSERT INTO [UserAward] (IDUser, IDAward)
            VALUES (@IDUser, @IDAward);
        END
    END
END;