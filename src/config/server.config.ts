import compression from 'compression';
import express, { urlencoded, Application, json } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import authCtrl from '../routes/auth.routes';
import filesCtrl from '../routes/files.routes';
import errorCtrl from '../controllers/error.controller';
import { createConnection } from 'typeorm';
import { verifyToken } from '../middlewares/auth';

class App {
  private app: Application;
  constructor(private port?: number) {
    this.app = express();
    createConnection();
    this.settings();
    this.middlewares();
    this.routes();
    this.extra();
  }

  private settings() {
    this.app.set('port', process.env.PORT || this.port || 5000);
    if (process.env.STATE! !== 'dev') {
      this.app.set('trust proxy', true);
    }
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(cookieParser());

    this.app.use(compression());
    this.app.use(urlencoded({ extended: false, limit: 5242880 }));
    this.app.use(json({ limit: 5242880 }));
    this.app.use(morgan('dev'));

    this.app.use('/api', verifyToken);
  }

  private routes() {
    this.app.use('/auth', authCtrl);
    this.app.use('/api', filesCtrl);
  }

  private extra() {
    this.app.use(errorCtrl);
  }

  public async listen() {
    const server = await this.app.listen(this.app.get('port'), '0.0.0.0');
    console.log(`server is running on port ${this.app.get('port')}`);
    return server;
  }
}

export default App;
