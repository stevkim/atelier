import React from 'react';
import './styles.css';

const Price = ({ selectedStyle, includeStyle }) => {
  const regularPrice = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;
  const isOnSale = salePrice > 0;

  return (
    <div className='overview-price-container'>
      <span className={`overview-price-${isOnSale}`}>
        $
        {regularPrice || '00.00'}
      </span>
      {isOnSale
        ? <span className='overview-sale-price'>{` $${salePrice}`}</span>
        : ''}
      {includeStyle === true ? (
        <div className='overview-selected-style'>
          {' '}
          <b>
            Style
            {' '}
            {'<'}
          </b>
          {' '}
          {selectedStyle.name || 'None Available'}
          {' '}
        </div>
      ) : ''}
    </div>
  );
};

export default Price;
