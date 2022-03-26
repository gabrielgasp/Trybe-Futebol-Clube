import { compare } from 'bcryptjs';
import { Router } from 'express';
import { ClubStatistics, jwtGenerator } from './helpers';
import { ClubsRepository, MatchesRepository, UsersRepository } from './repositories';
import { LoginRouter, ClubsRouter, MatchesRouter, LeaderboardRouter } from './routers';
import { ClubsService, LeaderboardService, LoginService, MatchesService } from './services';
import * as joiSchemas from './utils/joi';
import * as middlewares from './middlewares';

export class Factory {
  static createLogin() { // not sure that I should inject bcrypt's compare function
    return new LoginRouter(
      Router(),
      new LoginService(new UsersRepository(), compare, jwtGenerator),
      joiSchemas,
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
      joiSchemas,
      middlewares,
    );
  }

  static createLeaderboard() {
    return new LeaderboardRouter(
      Router(),
      new LeaderboardService(new ClubsRepository(), ClubStatistics),
    );
  }
}
