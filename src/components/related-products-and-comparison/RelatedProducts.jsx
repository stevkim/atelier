import React from 'react';
import ProductCard from './ProductCard.jsx';
import './styles/relatedProductsAndComparisonStyles.css';

const RelatedProducts = ({ relatedProducts, leftButton, rightButton, leftClick, rightClick}) => {


  return (
    <div className="related-products">
      {leftButton ? <button onClick={leftClick} >{'<'}</button> : <div></div>}
      {relatedProducts.map((id) => {
        return <ProductCard id={id} key={id} />
      })}
      {rightButton ? <button onClick={rightClick} >{'>'}</button> : <div></div>}
    </div>
  );
};

export default RelatedProducts;