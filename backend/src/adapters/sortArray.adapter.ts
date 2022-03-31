import sort from 'sort-array';
import { TSortArray } from '../types';

export const sortArray: TSortArray = (array, options) => sort(array, options);
