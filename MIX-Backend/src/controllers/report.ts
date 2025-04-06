import ReportService from '../db/report';

class ReportController {
  private ReportService: typeof ReportService;

  constructor() {
    this.ReportService = ReportService;
  }
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