import React from 'react';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import './styles/relatedProductsAndComparisonStyles.css';

const ProductList = ({ products, productCardClick, isYourOutfit, addToOutfit }) => {
  const [fourProducts, setFourProducts] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);

  useEffect(() => {
    setFirstIndex(0);
    setLeftButton(false);
    setRightButton(false);
    if (products.length > 4) {
      setLastIndex(3);
      setRightButton(true);
    } else {
      setLastIndex(products.length - 1);
    }
  }, [products]);

  useEffect(() => {
    setFourProducts(products.slice(firstIndex, lastIndex + 1));
  }, [firstIndex, lastIndex, products]);


  const leftClickHandler = () => {
    setRightButton(true);
    setLastIndex(lastIndex - 1);
    if (firstIndex === 1) {
      setLeftButton(false);
    }
    setFirstIndex(firstIndex - 1);
  };

  const rightClickHandler = () => {
    setLeftButton(true);
    setFirstIndex(firstIndex + 1);
    if (lastIndex === products.length - 2) {
      setRightButton(false);
    }
    setLastIndex(lastIndex + 1);
  };

  if (products.length === 0){
    return <div></div>
  }

  return (
    <div className="related-products">
      {leftButton ? <button onClick={leftClickHandler} >{'<'}</button> : <div></div>}
      {fourProducts.map((id) => {
        if (id === -1) {
          return <button onClick={addToOutfit} style={{width: '262px', minHeight: '396px'}} key={id}>+ <br />Add to Outfit</button>
        } else {
          return <ProductCard id={id} key={id} productCardClick={productCardClick} />
        }
      })}
      {rightButton ? <button onClick={rightClickHandler} >{'>'}</button> : <div></div>}
    </div>
  );
};

export default ProductList;