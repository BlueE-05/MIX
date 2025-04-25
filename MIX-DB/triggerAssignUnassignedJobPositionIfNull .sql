CREATE TRIGGER triggerAssignUnassignedJobPositionIfNull 
ON [dbo].[User]  
AFTER INSERT  
AS  
BEGIN  
    SET NOCOUNT ON;

    UPDATE u  
    SET u.IDJobPosition = (
        SELECT ID  
        FROM [dbo].[JobPosition]  
        WHERE [Name] = 'UNNASSIGNED'
    )  
    FROM [dbo].[User] u  
    INNER JOIN inserted i ON u.ID = i.ID  
    WHERE i.IDJobPosition IS NULL;
END;