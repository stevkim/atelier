import React, { useState, useEffect, useCallback } from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import { addToCart } from '../../helper-funcs/axios-requests.js';
import compareByFirstEntry from './helper-funcs/compareByFirstEntry.js';
import './styles.css';

const AddToCart = ({ skus }) => {
  const [sizeSelected, setSizeSelected] = useState([0, false]);
  const [quantitySelected, setQuantitySelected] = useState(0); // might be used to loop POST later idk
  const [skusArray, setSkusArray] = useState([]);
  const [skuNumber, setSkuNumber] = useState(0);

  useEffect(() => {
    const skuArray = Object.entries(skus);
    skuArray.sort(compareByFirstEntry);
    if (skuArray[0]?.length > 0) {
      setSkuNumber(Number(skuArray[0][0]));
    }
    setSkusArray(skuArray);
  }, [skus]);

  const updateSizeSelected = (size) => {
    setSkuNumber(skuNumber - sizeSelected[0] + Number(size));
    setSizeSelected([size, true]);
  };

  const updateQuantitySelected = useCallback((int) => {
    setQuantitySelected(int);
  }, []);

  const cartSubmitHandler = (e) => {
    e.preventDefault();
    addToCart(skuNumber);
  };

  if (skusArray.length > 0) {
    return (
      <form id='overview-cart-form' onSubmit={(e) => { cartSubmitHandler(e); }}>
        <SizeDropdown skus={skusArray} sizeSelected={sizeSelected} updateSizeSelected={updateSizeSelected} />
        <QuantityDropdown skus={skusArray} sizeSelected={sizeSelected} updateQuantitySelected={updateQuantitySelected} />
        {sizeSelected[0] === 0
          ? (
            <div>
              <button
                type='button'
                className='overview-cart-submit'
                aria-label='add-to-cart'
                onClick={() => {
                  const sizeDropdown = document.getElementById('overview-size-dropdown');
                  sizeDropdown.style.color = 'red';
                }}
              >
                Add To Cart
              </button>
            </div>
          )
          : (
            <button type='submit' className='overview-cart-submit' aria-label='add-to-cart'>Add To Cart</button>
          )}

      </form>
    );
  }
  return (
    <div id='overview-cart-form'>Out of stock!</div>
  );
};

export default AddToCart;
