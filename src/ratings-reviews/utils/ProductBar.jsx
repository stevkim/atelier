import React from 'react';
import { v4 as key } from 'uuid';
import './utilStyles.css';

const ProductBar = ({ rating }) => {
  const barLength = Array.from(Array(5));

  return (
    <div className='product-bar-container'>
      <div className='product-bar-icon' style={{ left: `${rating}%` }} />
      <div className='product-bar-wrapper'>
        {
          barLength.map((bar) => <div key={bar + key()} className='product-bar' />)
        }
      </div>
    </div>
  );
};

export default ProductBar;
