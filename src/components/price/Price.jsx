import React from 'react';
import './styles.css';

const Price = ({ selectedStyle, includeStyle }) => {
  const regularPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  const isOnSale = salePrice > 0;
  includeStyle = includeStyle || false;

  return (
    <div className='overview-price-container'>
      <span className={`overview-price-${isOnSale}`}>
        $
        {regularPrice}
      </span>
      {isOnSale
        ? <span className='overview-sale-price'>{` $${salePrice}`}</span>
        : ''}
      {includeStyle ? (
        <div className='overview-selected-style'>
          {' '}
          <b>
            Style
            {'<'}
          </b>
          {' '}
          {selectedStyle.name}
          {' '}
        </div>
      ) : ''}
    </div>
  );
};

export default Price;
