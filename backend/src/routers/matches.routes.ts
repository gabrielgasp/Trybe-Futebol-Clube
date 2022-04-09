import { Request, Response, Router } from 'express';
import { TBodyValidator } from '../typescript/types';
import { IMatchesService, IMiddlewares } from '../typescript/interfaces';

export class MatchesRouter {
  constructor(
    public router: Router,
    private matchesService: IMatchesService,
    private newMatchBodyValidator: TBodyValidator,
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
        const matchList = await this.matchesService.getAllMatches(req.body.inProgress);

        return res.status(200).json(matchList);
      },
    );
  }

  private getMatchById(): void {
    this.router.get(
      '/:id',
      async (req: Request, res: Response) => {
        const match = await this.matchesService.getMatchById(req.params.id);

        return match ? res.status(200).json(match)
          : res.status(404).json({ message: 'Match not found' });
      },
    );
  }

  private saveMatchInProgress(): void {
    this.router.post(
      '/',
      this.middlewares.jwtAuth,
      this.middlewares.validateBody(this.newMatchBodyValidator),
      async (req: Request, res: Response) => {
        const response = await this.matchesService.saveMatch(req.body);

        return response ? res.status(201).json(response)
          : res.status(422).json({ message: 'There is no team with such id!' });
      },
    );
  }

  private finisMatch(): void {
    this.router.patch(
      '/:id/finish',
      async (req: Request, res: Response) => {
        const response = await this.matchesService.finishMatch(req.params.id);

        return response ? res.status(200).json({ message: 'Finished match' })
          : res.status(422).json({ message: 'Match already over or does not exist' });
      },
    );
  }

  private updateScore(): void {
    this.router.patch(
      '/:id',
      async (req: Request, res: Response) => {
        const response = await this.matchesService.updateScore(req.params.id, req.body);

        return response ? res.status(200).json({ message: 'Match score updated' })
          : res.status(422).json({ message: 'Match already over or does not exist' });
      },
    );
  }
}
