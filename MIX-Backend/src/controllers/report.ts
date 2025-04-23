import ReportService from "../db/report";

class ReportController {
  private reportService = new ReportService;

  async getAllCierre(IDUser: string) {
    return this.reportService.getAllCierre(IDUser);
  }

  async getAllActive(IDUser: string) {
    return this.reportService.getAllActive(IDUser);
  }

  async getAllCancelled(IDUser: string) {
    return this.reportService.getAllCancelled(IDUser);
  }

  async getTotalComissions(IDUser: string) {
    return this.reportService.getTotalComissions(IDUser);
  }



}

export default new ReportController();