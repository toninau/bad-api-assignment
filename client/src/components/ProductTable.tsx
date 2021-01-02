import React from 'react';

import { Product } from '../types';

const ProductTable: React.FC<{products: Product[]}> = ({ products }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Name</th>
          <th>Price</th>
          <th>Color</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.manufacturer}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.color.join(', ')}</td>
            <td>{product.availability}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;