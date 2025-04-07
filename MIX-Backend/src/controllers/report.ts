import ReportService from "../db/report";

class ReportController {
  private reportService = new ReportService;

  
  async testConnection() {
    return this.reportService.testConnection();
  }

  
}

export default new ReportController();


//import ReportService from "db/report";
/*
import ReportService from '../db/report';

class ReportController {
  private ReportService: typeof ReportService;

  
  constructor() {
    this.ReportService = ReportService;
  }

  async getData() {
    const data= await this.ReportService.getData();
    console.log('🔹 Datos obtenidos:', data);
    return data;
  }
  */

  /*
  async getAllCierre() {
    return await this.ReportService.getAllCierre();
  }

  async getAllProspecto() {
    return await this.ReportService.getAllProspecto();
  }

  async getAllCotizacion() {
    return await this.ReportService.getAllCotizacion();
  }

  async getTotalComissions() {
    return await this.ReportService.getAllComission();
  }
    

}

export default new ReportController;
*/