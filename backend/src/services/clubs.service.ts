import { IClubsService } from '../typescript/interfaces';
import { ClubsRepository } from '../repositories';

export class ClubsService implements IClubsService {
  constructor(
    private clubsRepository: ClubsRepository,
  ) {}

  async getAllClubs() {
    return this.clubsRepository.getAllClubs();
  }

  async getClubById(id: string) {
    return this.clubsRepository.getClubById(id);
  }
}
