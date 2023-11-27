import React from 'react';
import './utilStyles.css';

const ProductBar = ({ rating }) => {
  const barLength = Array.from(Array(5));

  return (
    <div className="product-bar-container">
      <div className="product-bar-icon" style={{ left: `${rating}%` }} />
      <div className="product-bar-wrapper">
        {
          barLength.map((bar, index) => <div key={`productbar${index}`} className="product-bar" />)
        }
      </div>
    </div>
  );
};

export default ProductBar;
