import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import '../styles/relatedProductsAndComparisonStyles.css';

const ProductList = ({
  products, defaultStyles, ratings, productCardClick, actionButtonClick, isYourOutfit, addToOutfit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products]);

  const cardsToShow = 4;
  const leftButton = currentIndex > 0;
  const rightButton = currentIndex < products.length - cardsToShow;

  const leftClickHandler = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const rightClickHandler = () => {
    setCurrentIndex((prevIndex) => Math.min(products.length - cardsToShow, prevIndex + 1));
  };

  if (products.length === 0) {
    return <div />;
  }

  return (
    <div className='related-products'>
      {leftButton && <button type='button' onClick={leftClickHandler}>{'<'}</button>}
      <div className='carousel-container'>
        <div className='carousel-track' style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}>
          {products.map((product, index) => (
            <div key={product.id} className='carousel-item'>
              {product.id === -1 ? (
                <button type='button' onClick={addToOutfit} style={{ width: '262px', minHeight: '396px' }} key={product.id}>
                  +
                  <br />
                  Add to Outfit
                </button>

              ) : (<ProductCard productInfo={products[index]} defaultStyle={defaultStyles[index]} rating={ratings[index]} productCardClick={productCardClick} actionButtonClick={actionButtonClick} actionButton={isYourOutfit ? '❌' : '⭐'} />)}
            </div>
          ))}
        </div>
      </div>
      {rightButton ? <button type='button' onClick={rightClickHandler}>{'>'}</button> : <div />}
    </div>
  );
};

export default ProductList;
