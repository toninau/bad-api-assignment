export type Product = {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
  availability: string;
};

export type LegacyProduct = Omit<Product, 'availability'>;

export type Availability = {
  code: number;
  response: Array<{
    id: string;
    DATAPAYLOAD: string;
  }>
};