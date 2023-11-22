import React from 'react';

const Price = ({ selectedStyle }) => {
  const regularPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  const isOnSale = salePrice > 0;
  return (
    <div className='overview-price-container'>
      <span className='overview-price'>${regularPrice}</span>
      {isOnSale
        ? <span className='overview-sale-price'>{' Sale: $' + salePrice}</span>
        : ''}
      <div className='overview-selected-style'>
        {selectedStyle.name}
      </div>
    </div>
  );
}

export default Price;