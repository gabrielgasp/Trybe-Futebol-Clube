import sortArray from 'sort-array';
import { IClubHistory, IClubStats, IMatchGoals } from '../interfaces';

export class ClubStatistics implements IClubStats {
  public name: string;

  public totalPoints: number;

  public totalGames: number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor({ clubName, matches }: IClubHistory) {
    this.name = clubName;
    this.totalGames = matches.length;
    this.totalPoints = this.calcTotalPoints(matches);
    this.totalVictories = this.calcTotalVictories(matches);
    this.totalDraws = this.calcTotalDraws(matches);
    this.totalLosses = this.calcTotalLosses(matches);
    this.goalsFavor = this.calcGoalsFavor(matches);
    this.goalsOwn = this.calcGoalsOwn(matches);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = Number(((this.totalPoints / (matches.length * 3)) * 100).toFixed(2));
  }

  private calcTotalPoints(matches: IMatchGoals[]) {
    return matches.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalPoints + 3;
      if (match.goalsFavor === match.goalsOwn) return totalPoints + 1;
      return totalPoints;
    }, 0);
  }

  private calcTotalVictories(matches: IMatchGoals[]) {
    return matches.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalVictories + 1;
      return totalVictories;
    }, 0);
  }

  private calcTotalDraws(matches: IMatchGoals[]) {
    return matches.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsOwn) return totalDraws + 1;
      return totalDraws;
    }, 0);
  }

  private calcTotalLosses(matches: IMatchGoals[]) {
    return matches.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsOwn) return totalLosses + 1;
      return totalLosses;
    }, 0);
  }

  private calcGoalsFavor(matches: IMatchGoals[]) {
    return matches.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private calcGoalsOwn(matches: IMatchGoals[]) {
    return matches.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private sortLeaderboard(clubsStats: IClubStats[]) {
    const sortProps = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(clubsStats, { by: sortProps, order: sortPropsOrder });
  }
}
