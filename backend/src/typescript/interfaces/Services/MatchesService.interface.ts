import { IMatch, INewMatch, INewMatchResponse, IScore } from '../Match';

export interface IMatchesService {
  getAllMatches(inProgress: boolean | undefined): Promise<IMatch[]>;

  getMatchById(id: string): Promise<IMatch>;

  saveMatch(data: INewMatch): Promise<INewMatchResponse | null>;

  finishMatch(id: string): Promise<number>

  updateScore(id: string, newScore: IScore): Promise<number>
}
