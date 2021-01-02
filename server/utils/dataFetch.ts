import axios from 'axios';
import { Product } from '../types';

type Availability = {
  code: number;
  response: Array<{
    id: string;
    DATAPAYLOAD: string;
  }>
};

const productTypes = ['beanies', 'gloves', 'facemasks'];

export let productData: Product[] = [];

export const fetchProducts = async (): Promise<void> => {
  const productsArrays = await Promise.all(productTypes.map(async (category) => {
    const { data } = await axios.get<Product[]>(`https://bad-api-assignment.reaktor.com/v2/products/${category}`);
    return data.map(value => ({ ...value, availability: 'RETRIEVING' }));
  }));
  const products = productsArrays.flat(1);
  // For initialization and server restarts,
  // so there is something to show when availability is getting fetched
  if (Array.isArray(productData) && !productData.length) {
    productData = products;
  }
  const manufacturers = [...new Set(products.map(item => item.manufacturer))];
  // Adds availability information to manufacturer's products
  const productsWithAvailabilityArrays = await Promise.all(manufacturers.map(async (manufacturer) => {
    while (true) {
      const result = await axios.get<Availability>(`https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`);
      // Retries until response is Array instead of "[]"
      if (typeof result.data.response === 'object') {
        // Ignores values that are not found in products
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap#For_adding_and_removing_items_during_a_map
        const manufacturerProducts = result.data.response.flatMap((value) => {
          const found = products.find(test => test.id === value.id.toLowerCase());
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
      }
    }
  }));
  const productsWithAvailability = productsWithAvailabilityArrays.flat(1);
  productData = productsWithAvailability;
};