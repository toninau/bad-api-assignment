import axios from 'axios';
import { Product, LegacyProduct, Availability } from '../types';
import { baseURL, productTypes } from '../constants';

export let productData: Product[] = [];

export const updateProductData = async (): Promise<void> => {
  const products = await getProducts();
  // For initialization and server restarts, so there
  // is something to show when availability is getting fetched
  if (Array.isArray(productData) && !productData.length) {
    productData = products;
  }
  const manufacturers = [...new Set(products.map(item => item.manufacturer))];
  productData = await getProductsWithAvailability(products, manufacturers);
};

const getProducts = async () => {
  const productArrays = await Promise.all(productTypes.map(async (type) => {
    const { data } = await axios.get<LegacyProduct[]>(`${baseURL}/products/${type}`);
    return data.map(value => ({ ...value, availability: 'RETRIEVING' }));
  }));
  return productArrays.flat(1);
};

const getProductsWithAvailability = async (products: Product[], manufacturers: string[]) => {
  const productArrays = await Promise.all(manufacturers.map(async (manufacturer) => {
    // Retries until response is Array instead of "[]"
    while (true) {
      const { data } = await axios.get<Availability>(`${baseURL}/availability/${manufacturer}`);
      if (typeof data.response === 'object') {
        return availabilityToProducts(products, data);
      }
    }
  }));
  return productArrays.flat(1);
};

const availabilityToProducts = (products: Product[], availability: Availability) => {
  // Ignores values that are not found
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#For_adding_and_removing_items_during_a_map
  const manufacturerProducts = availability.response.flatMap((value) => {
    const found = products.find(product => product.id === value.id.toLowerCase());
    if (found) {
      const availability = /(?<=<INSTOCKVALUE>).*?(?=<\/INSTOCKVALUE>)/.exec(value.DATAPAYLOAD);
      if (availability) {
        const object = {
          ...found,
          availability: availability[0]
        };
        return object;
      }
    }
    return [];
  });
  return manufacturerProducts;
};