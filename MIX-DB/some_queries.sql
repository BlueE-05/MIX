-- Query obtener cantidad vendida
SELECT 
    CONCAT(u.Name, ' ', u.LastName) AS UserName,
    SUM(sa.Quantity * p.UnitaryPrice) AS TotalSales
FROM [User] u
JOIN [Sale] s ON s.IDUser = u.ID
JOIN [SaleArticle] sa ON sa.IDSale = s.ID
JOIN [Product] p ON sa.IDProduct = p.RefNum
WHERE u.ID = 'ana.gomez@empresa.com' AND s.IDPhase = 5
GROUP BY u.Name, u.LastName;

-- Query obtener cantidad vendida en cierto mes
SELECT 
    CONCAT(u.Name, ' ', u.LastName) AS UserName,
    SUM(sa.Quantity * p.UnitaryPrice) AS TotalSales
FROM [User] u
JOIN [Sale] s ON s.IDUser = u.ID
JOIN [SaleArticle] sa ON sa.IDSale = s.ID
JOIN [Product] p ON sa.IDProduct = p.RefNum
WHERE u.ID = 'ana.gomez@empresa.com' 
  AND s.IDPhase = 5
  AND MONTH(s.EndDate) = 4
  AND YEAR(s.EndDate) = 2025
GROUP BY u.Name, u.LastName;

-- Query select triggers
SELECT name FROM sys.triggers;
DROP TRIGGER [InsertSaleLifespanOnPhaseChange];
