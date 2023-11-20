import React from 'react';

const Price = ({selectedStyle}) => {
  const regularPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  const isOnSale = salePrice > 0;
  return (
    <div className='overview-price-container'>
      <div className='overview-selected-style'>
        {selectedStyle.name}
      </div>
      <span className='overview-price' className={'overview-price-onSale-' + isOnSale}>Price: {regularPrice}</span>
      {isOnSale
        ? <span className='overview-sale-price'>Sale Price: {salePrice}</span>
        : ''}
    </div>
  );
}

export default Price;