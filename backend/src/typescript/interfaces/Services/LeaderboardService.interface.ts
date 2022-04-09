import { IClubStats } from '../Club';

export interface ILeaderboardService {
  getHomeRanking(): Promise<IClubStats[]>;
  getAwayRanking(): Promise<IClubStats[]>;
  getOverallRanking(): Promise<IClubStats[]>;
}
