import ReportService from "../db/report";

class ReportController {
  private reportService = new ReportService;

  async getAllCierre(IDUser: number) {
    return this.reportService.getAllCierre(IDUser);
  }

  async getAllCotizacion(IDUser: number) {
    return this.reportService.getAllCotizacion(IDUser);
  }

  async getAllProspecto(IDUser: number) {
    return this.reportService.getAllProspecto(IDUser);
  }

  async getTotalComissions(IDUser: number) {
    return this.reportService.getTotalComissions(IDUser);
  }



}

export default new ReportController();