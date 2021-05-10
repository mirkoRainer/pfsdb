import { Application } from 'express';
import { PfsDbService } from './services/pfsdb.service';

export class Controller {
  private PfsDbService: PfsDbService;

  constructor(private app: Application) {
    this.PfsDbService = new PfsDbService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.PfsDbService.welcomeMessage);
    this.app.route("/pathfinder/:id")
      .delete(this.PfsDbService.deletePfsDbEntry)
      .get(this.PfsDbService.getPfsDbEntry)
      .post(this.PfsDbService.updateOrNewPfsDbEntry);
  }
}