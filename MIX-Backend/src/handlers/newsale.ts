import { Request, Response, NextFunction } from 'express';
import NewSaleController from '../controllers/newsale';
//Importar IDUSer. correo del usuario
import { UserEmail } from '../getIDUser';

//ana.gomez@empresa.com
class NewSaleHTTPHandler {
  private newsaleController: typeof NewSaleController;

    constructor() {
        this.newsaleController = NewSaleController;
    }

    //LISTO
    getAllContactByUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = UserEmail;
        const resultado = await this.newsaleController.getAllContactByUser(id);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };

    //LISTO
    getPrice = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idprod = String(req.params.idprod); 
        const resultado = await this.newsaleController.getPrice(idprod);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };

  
    getPhases= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.newsaleController.getPhases();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

    getAllProd= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.newsaleController.getAllProd();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

    createSale= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSale(iduser, req.body);
        res.json({ message: 'Contact created successfully 2' });
      } catch (error) {
      next(error);
      }
    };

    createSaleONE= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSaleONE(iduser, req.body);
        res.json({ message: 'Crear sale one successfully' });
      } catch (error) {
      next(error);
      }
    };
    
    createSaleMULT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
          const iduser = UserEmail; // Make sure UserEmail is properly defined
          const { idcont, idphase, products } = req.body;
      
          console.log(req.body);
          // Enhanced validation
          if (!iduser || !idcont || !idphase || !products || !Array.isArray(products)) {
              res.status(400).json({ error: 'Incomplete or invalid data' });
              return; // Added return to prevent further execution
        
          }
  
          // Validate each product in the array
          if (products.some(p => !p.idprod || !p.quant)) {
              res.status(400).json({ error: 'Invalid product data' });
              return;
          }
  
          const result = await this.newsaleController.createSaleMULT(iduser, {
              idcont,
              idphase,
              products
          });
  
          res.status(201).json({ 
              message: 'Sale created successfully',
              saleId: result
          });
      } catch (error) {
          console.error('Error in createSaleMULT route:', error);
          next(error); // Let the error handling middleware deal with it
      }
  };
}


export default new NewSaleHTTPHandler();

