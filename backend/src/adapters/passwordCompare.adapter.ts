import bcrypt from 'bcryptjs';

export type TPasswordCompare = (plain: string, hash: string) => Promise<boolean>;

export const passwordCompare: TPasswordCompare = async (plain, hash) => bcrypt.compare(plain, hash);
