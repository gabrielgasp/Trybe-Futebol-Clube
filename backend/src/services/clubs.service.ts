import { IClubsService, IClubsRepository } from '../typescript/interfaces';

export class ClubsService implements IClubsService {
  constructor(
    private clubsRepository: IClubsRepository,
  ) {}

  async getAllClubs() {
    return this.clubsRepository.getAllClubs();
  }

  async getClubById(id: string) {
    return this.clubsRepository.getClubById(id);
  }
}
