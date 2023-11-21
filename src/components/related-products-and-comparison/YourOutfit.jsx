import React from 'react';
import ProductCard from './ProductCard.jsx';

const YourOutfit = ( outfitProducts, leftButton) => {
  return (
    <div>
      {leftButton ? <button onClick={leftClick} >{'<'}</button> : <div></div>}
      {relatedProducts.map((id) => {
        return <ProductCard id={id} key={id} />
      })}
      {rightButton ? <button onClick={rightClick} >{'>'}</button> : <div></div>}
    </div>
  );
};

export default YourOutfit;