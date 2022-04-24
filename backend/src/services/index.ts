import { ClubsService } from './clubs.service';
import { LoginService } from './login.service';
import { MatchesService } from './matches.service';
import { LeaderboardService } from './leaderboard.service';
import { passwordCompare, sortArray } from '../adapters';
import { jwtGenerator, ClubStatistics } from '../helpers';
import { clubsRepository, usersRepository, matchesRepository } from '../repositories';

const clubsService = new ClubsService(clubsRepository);
const loginService = new LoginService(usersRepository, passwordCompare, jwtGenerator);
const matchesService = new MatchesService(matchesRepository, clubsRepository);
const leaderboardService = new LeaderboardService(clubsRepository, ClubStatistics, sortArray);

export { clubsService, loginService, matchesService, leaderboardService };
