import React, { useState, useEffect } from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';

const AddToCart = ({ skus }) => {
  const [sizeSelected, setSizeSelected] = useState(0);
  const [skusArray, setSkusArray] = useState([]);

  useEffect(() => {
    let arr = [];
    for (var skuNum in skus) {
      if (skus[skuNum].quantity > 0) {
        arr.push(skuNum);
      }
    }
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      arr[i] = skus[arr[i]];
    }
    setSkusArray(arr);
  }, []);

  const updateSizeSelected = (size) => {
    setSizeSelected(size);
  };

  const skuNumber = () => {
    for (var skuNum in skus) {
      if (skus[skuNum] === skusArray[sizeSelected]) {
        return skuNum;
      }
    }
    return 'not found';
  }

  const cartSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Added SKU ' + skuNumber() + ' to cart!')
  }

  if (skusArray.length > 0) {
    return (
      <form id='overview-cart-form' onSubmit={e => {cartSubmitHandler(e)}}>
        <SizeDropdown skus={skusArray} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} />
        <button type='submit' id='overview-cart-submit'>Add To Cart</button>
      </form>
    );
  } else {
    return (
      <div>Out of stock!</div>
    );
  }
}

export default AddToCart;