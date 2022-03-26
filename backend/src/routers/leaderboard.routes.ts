import { Router, Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces';

export class LeaderboardRouter {
  constructor(
    public router: Router,
    private leaderboardService: ILeaderboardService,
  ) {
    this.getHomeRanking();
    this.getAwayRanking();
    this.getOverallRanking();
  }

  private getHomeRanking(): void {
    this.router.get(
      '/home',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.leaderboardService.getHomeRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getAwayRanking(): void {
    this.router.get(
      '/away',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.leaderboardService.getAwayRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getOverallRanking(): void {
    this.router.get(
      '/',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.leaderboardService.getOverallRanking();
        return res.status(code).json(data);
      },
    );
  }
}
