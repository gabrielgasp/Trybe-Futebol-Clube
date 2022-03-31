import { IMatchGoals } from './MatchGoals.interface';

export interface IClubHistory {
  clubName: string;
  matches: IMatchGoals[];
}
