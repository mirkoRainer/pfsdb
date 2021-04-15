import express, { Application } from 'express';
import cors from 'cors';
import bodyParser = require('body-parser');
import { Controller } from './main.controller';
import mongoose from 'mongoose'
import { MONGO_URL } from './constants/pfsdb.constants';

class App {
  public app: Application;
  public pfsDbController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig()

    this.pfsDbController = new Controller(this.app);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(x => console.log(`Connected to mongodb...`));
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(express.json({ limit: '50mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: '50mb', extended:true}));

    //Enables cors   
    this.app.use(cors());
  }
}

export default new App().app;