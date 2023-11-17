import React from 'react';

const SizeDropdown = ({ skus, updateSizeSelected }) => {

  return (
    <select
      name='Size'
      title='-Size-'
      className='overview-size-dropdown'
      onChange={(e) => { updateSizeSelected(e.target.value) }}>
      {skus.map((sku, index) => {
        return (
          <option key={'size-option-' + index} value={index}>{sku.size}</option>
        );
      })}

    </select>
  )
}

export default SizeDropdown;