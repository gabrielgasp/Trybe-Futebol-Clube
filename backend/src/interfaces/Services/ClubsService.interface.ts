import { IClub } from '../Club/Club.interface';

export interface IClubsService {
  getAllClubs(): Promise<{
    code: number;
    data: IClub[];
  }>,
  getClubById(id: string): Promise<{
    code: number;
    data: IClub;
  } | {
    code: number;
    data: {
      message: string;
    };
  }>
}
