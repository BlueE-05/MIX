import ReportService from "../db/report";

export default class ReportController {
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

  async getTotalComissions(IDUser: string) {
    return this.reportService.getTotalComissions(IDUser);
  }

  async getAward(IDEmail: string) {
    return this.reportService.getLastAward(IDEmail);
  }

  async getProdInfo(idprod: number) {
    return this.reportService.getProdInfo(idprod);
  }

  async getTotalSalesByTeam(IDUser: string) {
    return this.reportService.getTotalSalesByTeam(IDUser);
  }

  async getTotalComissionByTeam(IDUser: string) {
    return this.reportService.getTotalComissionByTeam(IDUser);
  }

  async getTotalSalesByMember(IDUser: string) {
    return this.reportService.getTotalSalesByMember(IDUser);
  }

  async getSalesInfoByMember(IDUser: string) {
    return this.reportService.getSalesInfoByMember(IDUser);
  }
  
 
  async getDaysCurrentMonth() {
    return this.reportService.getDaysCurrentMonth();
  }

  async getEveryDayClosedByUser(IDUser: string) {
    return this.reportService.getEveryDayClosedByUser(IDUser);
  }

  async getDailyClosedSalesByTeam(IDUser: string) {
    return this.reportService.getDailyClosedSalesByTeam(IDUser);
  }

}