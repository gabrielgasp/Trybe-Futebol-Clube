import { compare } from 'bcryptjs';
import { ClubStatistics, jwtGenerator } from './helpers';
import { ClubsRepository, MatchesRepository, UsersRepository } from './repositories';
import { ClubsService, LeaderboardService, LoginService, MatchesService } from './services';

export class Factory {
  static createLogin() { // not sure that I should inject bcrypt's compare function
    return new LoginService(new UsersRepository(), compare, jwtGenerator);
  }

  static createClubs() {
    return new ClubsService(new ClubsRepository());
  }

  static createMatches() {
    return new MatchesService(new MatchesRepository(), new ClubsRepository());
  }

  static createLeaderboard() {
    return new LeaderboardService(new ClubsRepository(), ClubStatistics);
  }
}
