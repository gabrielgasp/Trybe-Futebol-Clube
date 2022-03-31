interface IOptions {
  by: string | string[];
  order: string | string[];
}

export type TSortArray = <T>(array: T[], options: IOptions) => T[];
