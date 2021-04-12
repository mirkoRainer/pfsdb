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
  }
}