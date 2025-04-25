import ReportService from "../db/report";

class ReportController {
  private reportService = new ReportService;

  async getAllCierre(iduser: string) {
    return this.reportService.getAllCierre(iduser);
  }

  async getTemPos(IDUser: string) {
    return this.reportService.getTemPos(IDUser);
  }

  async getAllActive(IDUser: string) {
    return this.reportService.getAllActive(IDUser);
  }

  async getAllCancelled(IDUser: string) {
    return this.reportService.getAllCancelled(IDUser);
  }

  
  //Revisar
  async getTotalComissions(IDUser: string) {
    return this.reportService.getTotalComissions(IDUser);
  }

  async getAward(IDEmail: string) {
    return this.reportService.getLastAward(IDEmail);
  }

}

export default new ReportController();