import { IUser } from '../User/User.interface';

export interface IUsersRepository {
  getUserByEmail(email: string): Promise<IUser | null>
}
