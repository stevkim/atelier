import React from 'react';

const ProductBar = ({ rating }) => {
  const barLength = Array.from(Array(5));

  return (
    <div className='product-bar-container'>
      <div className='product-bar-icon' style={{ left: `${rating}%`}}></div>
      <div className='product-bar-wrapper'>
        {
          barLength.map((bar, index) => {
            return <div key={`productbar${index}`} className='product-bar'></div>
          })
        }
      </div>
    </div>
  )
}

export default ProductBar;