import React from 'react';

interface TopNavProps {
  loading: boolean;
  productType: string;
  setProductType: (type: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ loading, productType, setProductType }) => {
  const productTypes = ['gloves', 'beanies', 'facemasks'];

  return (
    <div className="top-nav">
      {productTypes.map((type) => (
        <button
          key={type}
          disabled={loading}
          onClick={() => setProductType(type)}
          id={productType === type ? 'active' : ''}>
          {type}
        </button>
      ))}
    </div>
  );
};

export default TopNav;