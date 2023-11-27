import React from 'react';

const SizeDropdown = ({ skus, updateSizeSelected }) => (
  <select
    name="Size"
    title="-Size-"
    className="overview-size-dropdown"
    onChange={(e) => { updateSizeSelected(e.target.value); }}
  >
    {skus.map((sku, index) => (
      <option key={`size-option-${index}`} value={index}>{sku.size}</option>
    ))}

  </select>
);

export default SizeDropdown;
