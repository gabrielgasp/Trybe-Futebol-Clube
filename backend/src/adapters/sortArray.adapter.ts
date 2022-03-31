import sort from 'sort-array';
import { TSortArray } from '../typescript/types';

export const sortArray: TSortArray = (array, options) => sort(array, options);
