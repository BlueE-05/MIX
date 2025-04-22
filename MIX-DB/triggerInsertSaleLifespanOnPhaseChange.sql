CREATE TRIGGER InsertSaleLifespanOnPhaseChange
ON [Sale]
AFTER UPDATE
AS
BEGIN
    -- Verificar si se modificó la fase de venta
    IF UPDATE(IDPhase)
    BEGIN
        -- Declarar variables
        DECLARE @IDSale INT, @NewSalePhase INT, @ExistingPhase BIT;
        
        -- Obtener el ID de venta y la nueva fase para cada registro actualizado
        SELECT 
            @IDSale = i.ID,
            @NewSalePhase = i.IDPhase
        FROM INSERTED i;
        
        -- Verificar si ya existe un registro con esta fase para esta venta
        SELECT @ExistingPhase = CASE WHEN EXISTS (
            SELECT 1 FROM [SaleLifespan] 
            WHERE IDSale = @IDSale AND SalePhase = @NewSalePhase
        ) THEN 1 ELSE 0 END;
        
        -- Si ya existe, eliminarlo primero
        IF @ExistingPhase = 1
        BEGIN
            DELETE FROM [SaleLifespan] 
            WHERE IDSale = @IDSale AND SalePhase = @NewSalePhase;
        END;
        
        -- Insertar el nuevo registro del cambio de fase
        INSERT INTO [SaleLifespan] (IDSale, SalePhase, ChangeDate)
        VALUES (@IDSale, @NewSalePhase, GETDATE());
    END;
END;

-- si se puede regresar a una fase anterior