import { Router } from 'express';
import { ClubsRouter } from './clubs.routes';
import { LoginRouter } from './login.routes';
import { MatchesRouter } from './matches.routes';
import { LeaderboardRouter } from './leaderboard.routes';
import { clubsService, loginService, leaderboardService, matchesService } from '../services';
import { loginBodyValidator as LBV, newMatchBodyValidator as NMBV } from '../adapters';
import * as middlewares from '../middlewares';

const clubsRouter = new ClubsRouter(Router(), clubsService).router;
const loginRouter = new LoginRouter(Router(), loginService, LBV, middlewares).router;
const matchesRouter = new MatchesRouter(Router(), matchesService, NMBV, middlewares).router;
const leaderboardRouter = new LeaderboardRouter(Router(), leaderboardService).router;

export { clubsRouter, loginRouter, matchesRouter, leaderboardRouter };
