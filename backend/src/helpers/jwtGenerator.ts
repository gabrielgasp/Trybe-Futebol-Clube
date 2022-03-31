import jwt from 'jsonwebtoken';
import { ITokenData } from '../typescript/interfaces';

const jwtConfig = { expiresIn: '1d' };

const SECRET = process.env.JWT_SECRET || 'a_really_bad_secret';

export const jwtGenerator = (data: ITokenData) => jwt.sign({ ...data }, SECRET, jwtConfig);
