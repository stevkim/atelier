import React, { useState, useEffect, memo } from 'react';
import { v4 as key } from 'uuid';

const SizeDropdown = ({ skus, sizeSelected, updateSizeSelected }) => (
  <select
    name='Size'
    className='overview-size-dropdown'
    id='overview-size-dropdown'
    value={sizeSelected[0]}
    onChange={(e) => {
      updateSizeSelected(e.target.value);
      document.getElementById('overview-size-dropdown').style.color = 'black';
    }}
  >
    <option value={0}>-Size-</option>
    {skus.map((sku, index) => {
      if (sku[1].quantity === 0) {
        return (
          <option key={key()} disabled value={index}>{`${sku[1].size} Out of Stock!`}</option>
        );
      }
      return (
        <option key={key()} value={index}>{sku[1].size}</option>
      );
    })}
  </select>
);
export default SizeDropdown;
