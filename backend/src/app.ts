import 'dotenv/config';
import express, { Express } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { loginRouter, clubsRouter, matchesRouter, leaderboardRouter } from './routers';
import { errorHandler } from './middlewares';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use('/login', loginRouter);
    this.app.use('/clubs', clubsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardRouter);
  }

  private errorHandler(): void {
    this.app.use(errorHandler);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log('Running on', PORT);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
