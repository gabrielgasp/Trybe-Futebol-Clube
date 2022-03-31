import bcrypt from 'bcryptjs';
import { TPasswordCompare } from '../types';

export const passwordCompare: TPasswordCompare = async (plain, hash) => bcrypt.compare(plain, hash);
