import { productData } from '../utils/dataFetch';
import { Product } from '../types';

const getProducts = (type: string): Product[] => {
  return productData.filter((value) => type === value.type);
};

export default {
  getProducts
};