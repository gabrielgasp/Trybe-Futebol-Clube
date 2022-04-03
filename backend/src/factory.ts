import { Router } from 'express';
import { ClubStatistics, jwtGenerator } from './helpers';
import { ClubsRepository, MatchesRepository, UsersRepository } from './repositories';
import { LoginRouter, ClubsRouter, MatchesRouter, LeaderboardRouter } from './routers';
import { ClubsService, LeaderboardService, LoginService, MatchesService } from './services';
import * as middlewares from './middlewares';
import { passwordCompare, sortArray, loginBodyValidator, newMatchBodyValidator } from './adapters';

export class Factory {
  static createLogin() {
    return new LoginRouter(
      Router(),
      new LoginService(new UsersRepository(), passwordCompare, jwtGenerator),
      loginBodyValidator,
      middlewares,
    );
  }

  static createClubs() {
    return new ClubsRouter(
      Router(),
      new ClubsService(new ClubsRepository()),
    );
  }

  static createMatches() {
    return new MatchesRouter(
      Router(),
      new MatchesService(new MatchesRepository(), new ClubsRepository()),
      newMatchBodyValidator,
      middlewares,
    );
  }

  static createLeaderboard() {
    return new LeaderboardRouter(
      Router(),
      new LeaderboardService(new ClubsRepository(), ClubStatistics, sortArray),
    );
  }
}
