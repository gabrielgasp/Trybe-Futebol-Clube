import { IClub } from '../Club/Club.interface';

export interface IClubsService {
  getAllClubs(): Promise<IClub[]>,
  getClubById(id: string): Promise<IClub | undefined>
}
