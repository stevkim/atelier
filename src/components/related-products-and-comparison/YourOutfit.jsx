import React from 'react';
import ProductCard from './ProductCard.jsx';

const YourOutfit = (outfitProducts, leftButton) => (
  <div>
    {leftButton ? <button onClick={leftClick}>{'<'}</button> : <div />}
    {relatedProducts.map((id) => <ProductCard id={id} key={id} />)}
    {rightButton ? <button onClick={rightClick}>{'>'}</button> : <div />}
  </div>
);

export default YourOutfit;
