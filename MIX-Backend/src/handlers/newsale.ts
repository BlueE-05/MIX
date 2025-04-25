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
        res.json({ message: 'Contact created successfully' });
      } catch (error) {
      next(error);
      }
    };

    createSaleONE= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSaleONE(iduser, req.body);
        res.json({ message: 'Contact created successfully' });
      } catch (error) {
      next(error);
      }
    };
    
    createSaleMULT = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const iduser = UserEmail
          const { idcont, idphase, products } = req.body;
  
          // Validación básica
          if (!iduser || !idcont || !idphase || !products || !Array.isArray(products)) {
              return res.status(400).json({ error: 'Datos incompletos o inválidos' });
          }
  
          const result = await this.newsaleController.createSaleMULT(iduser, {
              idcont,
              idphase,
              products // Enviamos directamente el array de productos
          });
  
          res.status(201).json({ 
              message: 'Venta creada exitosamente',
              saleId: result // Retornamos el ID de la nueva venta
          });
      } catch (error) {
          next(error);
      }
  };
    
    
    
  
    



}

export default new NewSaleHTTPHandler();

