import { Router, Request, Response } from 'express';
import { ILeaderboardService } from '../typescript/interfaces';

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
        const homeLeaderboard = await this.leaderboardService.getHomeRanking();
        return res.status(200).json(homeLeaderboard);
      },
    );
  }

  private getAwayRanking(): void {
    this.router.get(
      '/away',
      async (_req: Request, res: Response) => {
        const awayLeaderboard = await this.leaderboardService.getAwayRanking();
        return res.status(200).json(awayLeaderboard);
      },
    );
  }

  private getOverallRanking(): void {
    this.router.get(
      '/',
      async (_req: Request, res: Response) => {
        const overallLeaderboard = await this.leaderboardService.getOverallRanking();
        return res.status(200).json(overallLeaderboard);
      },
    );
  }
}
