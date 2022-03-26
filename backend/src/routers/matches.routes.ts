import { Request, Response, Router } from 'express';
import { IMatchesService, IJoiSchemas, IMiddlewares } from '../interfaces';

export class MatchesRouter {
  constructor(
    public router: Router,
    private matchesService: IMatchesService,
    private joiSchemas: IJoiSchemas,
    private middlewares: IMiddlewares,
  ) {
    this.getAllMatches();
    this.getMatchById();
    this.saveMatchInProgress();
    this.finisMatch();
    this.updateScore();
  }

  private getAllMatches(): void {
    this.router.get(
      '/',
      this.middlewares.parseInProgressQuery,
      async (req: Request, res: Response) => {
        const { code, data } = await this.matchesService.getAllMatches(req.body.inProgress);

        return res.status(code).json(data);
      },
    );
  }

  private getMatchById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await this.matchesService.getMatchById(req.params.id);

        return res.status(code).json(data);
      },
    );
  }

  private saveMatchInProgress(): void {
    this.router.post(
      '/',
      this.middlewares.jwtAuth,
      this.middlewares.validateBody(this.joiSchemas.newMatch),
      async (req: Request, res: Response) => {
        const { code, data } = await this.matchesService.saveMatch(req.body);

        return res.status(code).json(data);
      },
    );
  }

  private finisMatch(): void {
    this.router.patch(
      '/:id/finish',
      async (req: Request, res: Response) => {
        const { code, data } = await this.matchesService.finishMatch(req.params.id);

        return res.status(code).json(data);
      },
    );
  }

  private updateScore(): void {
    this.router.patch(
      '/:id',
      async (req: Request, res: Response) => {
        const { code, data } = await this.matchesService.updateScore(req.params.id, req.body);

        return res.status(code).json(data);
      },
    );
  }
}
