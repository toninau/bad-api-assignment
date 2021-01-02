import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Product } from './types';
import ProductTable from './components/ProductTable';
import TopNav from './components/TopNav';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productType, setProductType] = useState('beanies');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>(`/api/products/${productType}`);
        setError('');
        setProducts(data);
      } catch (error) {
        setError('Could not get products');
      }
      setLoading(false);
    };
    void fetchProducts();
  }, [productType]);

  return (
    <div className="container">
      <TopNav loading={loading} productType={productType} setProductType={setProductType} />
      <div className="content">
        {(loading || !!error) ?
          <div className="content__message">{loading ? 'loading...' : error}</div> :
          <ProductTable products={products} />
        }
      </div>
    </div>
  );
};

export default App;
