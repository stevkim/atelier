import React from 'react';

const SizeDropdown = ({ skus, updateSizeSelected }) => (
  <select
    name='Size'
    title='-Size-'
    className='overview-size-dropdown'
    id='overview-size-dropdown'
    onChange={(e) => {
      updateSizeSelected(e.target.value);
      document.getElementById('overview-size-dropdown').style.color = 'black';
    }}
  >
    <option hidden value={0}>-Size-</option>
    {skus.map((sku, index) => {
      if (sku.quantity === 0) {
        return (
          <option key={`size-option-${index}`} disabled value={index}>{`${sku.size} Out of Stock!`}</option>
        );
      }
      return (
        <option key={`size-option-${index}`} value={index}>{sku.size}</option>
      );
    })}

  </select>
);

export default SizeDropdown;
