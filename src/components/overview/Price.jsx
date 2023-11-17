import React from 'react';

const Price = ({selectedStyle}) => {
  const regularPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  const isOnSale = salePrice > 0;
  return (
    <div id='overview-price-container'>
      <span className='overview-price' id={'overview-price-onSale-' + isOnSale}>Price: {regularPrice}</span>
      {isOnSale
        ? <span id='overview-sale-price'>Sale Price: {salePrice}</span>
        : ''}
    </div>
  );
}

export default Price;