export type TPasswordCompare = (plain: string, hash: string) => Promise<boolean>;
