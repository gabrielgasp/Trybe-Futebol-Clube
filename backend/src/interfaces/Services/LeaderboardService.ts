import { IClubStats } from '../Club';

export interface ILeaderboardService {
  getHomeRanking(): Promise<{
    code: number;
    data: IClubStats[];
  }>;
  getAwayRanking(): Promise<{
    code: number;
    data: IClubStats[];
  }>;
  getOverallRanking(): Promise<{
    code: number;
    data: IClubStats[];
  }>;
}
