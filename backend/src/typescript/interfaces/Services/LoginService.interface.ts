import { ICredentials } from '../User/Credentials.interface';

interface ILoginResponse {
  user: {
    id: number;
    email: string;
    role: string;
    username: string;
  };
  token: string;
}

export interface ILoginService {
  login(credentials: ICredentials): Promise<ILoginResponse | null>
}
