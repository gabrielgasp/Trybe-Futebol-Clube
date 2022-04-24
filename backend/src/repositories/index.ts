import { ClubsRepository } from './clubs.repository';
import { UsersRepository } from './users.repository';
import { MatchesRepository } from './matches.repository';

const clubsRepository = new ClubsRepository();
const usersRepository = new UsersRepository();
const matchesRepository = new MatchesRepository();

export { clubsRepository, usersRepository, matchesRepository };
