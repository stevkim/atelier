import React, { useState, useEffect } from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import { addToCart } from '../../helper-funcs/axios-requests.js';
import compareByFirstEntry from './helper-funcs/compareByFirstEntry.js';
import './styles.css';

const AddToCart = ({ skus }) => {
  const [sizeSelected, setSizeSelected] = useState([0, false]);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [skusArray, setSkusArray] = useState([]);
  const [skuNumber, setSkuNumber] = useState(0);

  useEffect(() => {
    const skuArray = Object.entries(skus);
    skuArray.sort(compareByFirstEntry);
    setSkuNumber(skuArray[0]);
    setSkusArray(skuArray);
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
      <form id='overview-cart-form' onSubmit={(e) => { cartSubmitHandler(e); }}>
        <SizeDropdown skus={skusArray} sizeSelected={sizeSelected} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} updateQuantitySelected={updateQuantitySelected} />
        {sizeSelected[0] === 0
          ? (
            <button
              type='button'
              className='overview-cart-submit'
              onClick={() => {
                const sizeDropdown = document.getElementById('overview-size-dropdown');
                sizeDropdown.style.color = 'red';
              }}
            >
              Add To Fart
            </button>
          )
          : <button type='submit' className='overview-cart-submit'>AddToCart</button>}
      </form>
    );
  }
  return (
    <div>Out of stock!</div>
  );
};

export default AddToCart;
