import React, { useState, useEffect } from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import addToCart from './helper-funcs/addToCart.js'

const AddToCart = ({ skus }) => {
  const [sizeSelected, setSizeSelected] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [skusArray, setSkusArray] = useState([]);
  const [skuNumber, setSkuNumber] = useState(0);
  // skuNum in skus
  // how access?
  // const skuNum =

  useEffect(() => {
    let arr = [];
    // This matters to keep the sizes in order for sizeDropdown and to only show proper sizes.
    for (var skuNum in skus) {
      if (skus[skuNum].quantity > 0) {
        arr.push(skuNum);
      }
    }
    arr.sort();
    setSkuNumber(arr[0]); // While the skuNums are sorted, take advantage
    console.log(skuNumber);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = skus[arr[i]];
    }
    setSkusArray(arr);
  }, [skus]);

  const updateSizeSelected = (size) => {
    setSkuNumber(skuNumber - sizeSelected + size); // skuNums are consecutive
    setSizeSelected(size);
  };

  const updateQuantitySelected = (int) => {
    setQuantitySelected(int);
  };

  const cartSubmitHandler = (e) => {
    e.preventDefault();
    console.log('Added SKU: ' + skuNumber + ' ' + quantitySelected + ' times!');
    // addToCart(skuNumber, quantitySelected); // This is bugged currently. Request returns a 422.
  };

  if (skusArray.length > 0) {
    return (
      <form id='overview-cart-form' onSubmit={e => {cartSubmitHandler(e)}}>
        <SizeDropdown skus={skusArray} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} updateQuantitySelected={updateQuantitySelected}/>
        <button type='submit' className='overview-cart-submit'>Add To Cart</button>
      </form>
    );
  } else {
    return (
      <div>Out of stock!</div>
    );
  }
}

export default AddToCart;