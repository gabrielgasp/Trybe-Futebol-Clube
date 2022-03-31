import sort from 'sort-array';

interface IOptions {
  by: string | string[];
  order: string | string[];
}

export type TSortArray = <T>(array: T[], options: IOptions) => T[];

export const sortArray: TSortArray = (array, options) => sort(array, options);
