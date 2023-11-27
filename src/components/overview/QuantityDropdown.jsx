import React from 'react';

const QuantityDropdown = ({ skus, sizeSelected, updateQuantitySelected }) => (
  <select
    name="Quantity"
    title="-Quantity-"
    className="overview-quantity-dropdown"
    onChange={(e) => { updateQuantitySelected(e.target.value); }}
  >
    {Array.from(Array(skus[sizeSelected].quantity)).slice(0, 25).map((value, index) => (
      <option key={`overview-cart-quantity-${index + 1}`} value={index + 1}>
        {index + 1}
      </option>
    ))}
  </select>
);

export default QuantityDropdown;

// Rating of helpfulness
// Two links for yes/no
// Display a number
// "Yes" exists, "no" doesn't exist in API
// In mockup, there is a report button instead of a no button
