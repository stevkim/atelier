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
  // const [skuSubmitted, setSkuSubmitted] = useState(false);

  useEffect(() => {
    const skuArray = Object.entries(skus);
    skuArray.sort(compareByFirstEntry);
    setSkuNumber(skuArray[0]);
    setSkusArray(skuArray);
    // setSkuSubmitted(false);
  }, [skus]);

  const updateSizeSelected = (size) => {
    setSkuNumber(skuNumber - sizeSelected + size); // skuNums are consecutive
    setSizeSelected([size, true]);
    // setSkuSubmitted(false);
  };

  const updateQuantitySelected = (int) => {
    setQuantitySelected(int);
  };

  const cartSubmitHandler = (e) => {
    e.preventDefault();
    addToCart(skuNumber, quantitySelected); // This is bugged currently. Request returns a 422.
    // setSkuSubmitted(true);
  };

  if (skusArray.length > 0) {
    return (
      <form id='overview-cart-form' onSubmit={(e) => { cartSubmitHandler(e); }}>
        <SizeDropdown skus={skusArray} sizeSelected={sizeSelected} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} updateQuantitySelected={updateQuantitySelected} />
        {sizeSelected[0] === 0
          ? (
            <div className='overview-cart-submit'>
              Add To Cart
              <button
                type='button'
                onClick={() => {
                  const sizeDropdown = document.getElementById('overview-size-dropdown');
                  sizeDropdown.style.color = 'red';
                }}
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                </svg>

              </button>
            </div>
          )
          : (
            <div>
              <button type='submit' className='overview-cart-submit'>Add To Cart</button>
            </div>
          )}

      </form>
    );
  }
  return (
    <div>Out of stock!</div>
  );
};

export default AddToCart;
