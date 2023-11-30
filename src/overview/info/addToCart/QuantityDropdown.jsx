import React from 'react';

const QuantityDropdown = ({ skus, sizeSelected, updateQuantitySelected }) => {
  if (sizeSelected[1]) {
    return (
      <select
        name='Quantity'
        title='-Quantity-'
        className='overview-quantity-dropdown'
        onChange={(e) => { updateQuantitySelected(e.target.value); }}
      >
        {Array.from(Array(skus[sizeSelected[0]][1].quantity)).slice(0, 25).map((value, index) => (
          <option key={`overview-cart-quantity-${index + 1}`} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    );
  }
  return (
    <select
      name='Quantity'
      title='-Quantity-'
      className='overview-quantity-dropdown'
      disabled
      onChange={(e) => { updateQuantitySelected(e.target.value); }}
    >
      <option hidden value={0}>-</option>
    </select>
  );
};

export default QuantityDropdown;
