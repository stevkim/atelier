import React, { useState, useEffect } from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import addToCart from '../../helper-funcs/axios-requests';
import './styles.css'

const AddToCart = ({ skus }) => {
  const [sizeSelected, setSizeSelected] = useState([0, false]);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [skusArray, setSkusArray] = useState([]);
  const [skuNumber, setSkuNumber] = useState(0);
  // skuNum in skus
  // how access?
  // const skuNum =

  useEffect(() => {
    let arr = [];
    // This matters to keep the sizes in order for sizeDropdown and to only show proper sizes.
    for (var skuNum in skus) {
      arr.push(skuNum);
    }
    arr.sort();
    setSkuNumber(arr[0]); // While the skuNums are sorted, take advantage
    for (var i = 0; i < arr.length; i++) {
      arr[i] = skus[arr[i]];
    }
    setSkusArray(arr);
  }, [skus]);

  const updateSizeSelected = (size) => {
    setSkuNumber(skuNumber - sizeSelected + size); // skuNums are consecutive
    setSizeSelected([size, true]);
  };

  const updateQuantitySelected = (int) => {
    setQuantitySelected(int);
  };

  const cartSubmitHandler = (e) => {
    e.preventDefault();
    addToCart(skuNumber, quantitySelected); // This is bugged currently. Request returns a 422.
  };

  if (skusArray.length > 0) {
    return (
      <form id='overview-cart-form' onSubmit={e => { cartSubmitHandler(e) }}>
        <SizeDropdown skus={skusArray} sizeSelected={sizeSelected} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} updateQuantitySelected={updateQuantitySelected} />
        {sizeSelected === 0
          ? <button type='button' className='overview-cart-submit' onClick={() => {
            const sizeDropdown = document.getElementById('overview-size-dropdown');
            sizeDropdown.style.color = 'red';
          }}>Add To Fart</button>
          : <button type='submit' className='overview-cart-submit'>AddToCart</button>}
      </form>
    );
  } else {
    return (
      <div>Out of stock!</div>
    );
  }
}

export default AddToCart;