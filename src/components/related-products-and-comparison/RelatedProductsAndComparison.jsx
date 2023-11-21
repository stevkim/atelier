import React from 'react';
import { useState, useEffect } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import './styles/relatedProductsAndComparisonStyles.css'

const RelatedProductsAndComparison = () => {
  const [fourProducts, setFourProducts] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);

  useEffect(() => {
    // replace this with API call to get relatedProducts
    const apiCallResults = [40348, 40352, 40350, 40345, 40344, 40346, 40347];
    if (apiCallResults.length > 4) {
      setLastIndex(3)
      setRightButton(true);
    } else {
      setLastIndex(apiCallResults.length - 1)
    }
    setRelatedProducts(apiCallResults);
  }, [])

  useEffect(() => {
    setFourProducts(relatedProducts.slice(firstIndex, lastIndex + 1));
  }, [firstIndex, lastIndex]);

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
    if (lastIndex === relatedProducts.length - 2) {
      setRightButton(false);
    }
    setLastIndex(lastIndex + 1);
  };


  return (
    <div>
      <h2>RELATED PRODUCTS</h2>
      <RelatedProducts relatedProducts={fourProducts} leftButton={leftButton} rightButton={rightButton} leftClick={leftClickHandler} rightClick={rightClickHandler} />
    </div>
  )
};

export default RelatedProductsAndComparison;