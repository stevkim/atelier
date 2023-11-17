import React from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProductsAndComparison = () => {
  const relatedProducts = [40348, 40352, 40350, 40345, 40344];

  return (
    <div>
      {relatedProducts.map((id) => {
        return <ProductCard id={id} key={id} />
      })}
    </div>
  );
};

export default RelatedProductsAndComparison;