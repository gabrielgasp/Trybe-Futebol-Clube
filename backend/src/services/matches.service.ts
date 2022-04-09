import {
  INewMatch,
  IScore,
  IClubsRepository,
  IMatchesRepository,
  IMatch,
  IMatchesService,
} from '../typescript/interfaces';

export class MatchesService implements IMatchesService {
  constructor(
    private matchesRepository: IMatchesRepository,
    private clubsRepository: IClubsRepository,
  ) {}

  async getAllMatches(inProgress: boolean | undefined = undefined) {
    let matchList: IMatch[];

    if (inProgress === undefined) {
      matchList = await this.matchesRepository.getAllMatches();
    } else {
      matchList = inProgress ? await this.matchesRepository.getAllInProgressMatches()
        : await this.matchesRepository.getAllFinishedMatches();
    }

    return matchList;
  }

  async getMatchById(id: string) {
    return this.matchesRepository.getMatchById(id);
  }

  async saveMatch(data: INewMatch) {
    const teams = await Promise.all([
      this.clubsRepository.getClubById(data.homeTeam.toString()),
      this.clubsRepository.getClubById(data.awayTeam.toString()),
    ]);

    if (teams.includes(undefined)) {
      return null;
    }

    const newMatch = await this.matchesRepository.saveMatch(data);

    return newMatch;
  }

  async finishMatch(id: string) {
    return this.matchesRepository.finishMatch(id);
  }

  async updateScore(id: string, newScore: IScore) {
    return this.matchesRepository.updateScore(id, newScore);
  }
}
