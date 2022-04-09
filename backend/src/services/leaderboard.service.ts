import { TSortArray } from '../typescript/types';
import { ClubStatistics } from '../helpers';
import { ILeaderboardService, IClubsRepository, IClubStats } from '../typescript/interfaces';

export class LeaderboardService implements ILeaderboardService {
  constructor(
    private clubsRepository: IClubsRepository,
    private ClubStats: typeof ClubStatistics,
    private sortArray: TSortArray,
  ) {}

  private sortLeaderboard(clubsStats: IClubStats[]) {
    const sortProps = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return this.sortArray(clubsStats, { by: sortProps, order: sortPropsOrder });
  }

  async getHomeRanking() {
    const clubsHomeHistory = await this.clubsRepository.getClubsHomeHistory();

    const unsortedHomeLeaderboard = clubsHomeHistory
      .map((clubHistory) => new this.ClubStats(clubHistory));

    const homeLeaderboard = this.sortLeaderboard(unsortedHomeLeaderboard);

    return homeLeaderboard;
  }

  async getAwayRanking() {
    const clubsAwayHistory = await this.clubsRepository.getClubsAwayHistory();

    const unsortedAwayLeaderboard = clubsAwayHistory
      .map((clubHistory) => new this.ClubStats(clubHistory));

    const awayLeaderboard = this.sortLeaderboard(unsortedAwayLeaderboard);

    return awayLeaderboard;
  }

  async getOverallRanking() {
    const clubsOverallHistory = await this.clubsRepository.getClubsOverallHistory();

    const unsortedOverallLeaderboard = clubsOverallHistory
      .map((clubHistory) => new this.ClubStats(clubHistory));

    const overallLeaderboard = this.sortLeaderboard(unsortedOverallLeaderboard);

    return overallLeaderboard;
  }
}
