import React from 'react';
import Reviews from './Reviews.jsx';
import StylesView from './StylesView.jsx';
import Price from '../../components/price/Price.jsx';
import AddToCart from './addToCart/AddToCart.jsx';
import './styles.css';

const Info = ({ product, style, selectedStyle, updateStyle }) => (
  <div className='overview-overview'>
    <Reviews product={product} />
    <div className='overview-category'>
      {product.category}
    </div>
    <h3 className='overview-title'>{product.title}</h3>
    <Price selectedStyle={selectedStyle} includeStyle />
    <StylesView styleIndex={style} styles={product.styles} updateStyle={updateStyle} />
    <AddToCart skus={selectedStyle.skus} />
    <div className='overview-share-buttons'>
      <button className='share-facebook' type='button'>f</button>
      <button className='share-x' type='button'>x</button>
      <button className='share-pinterest' type='button'>P</button>
    </div>
  </div>
);

export default Info;
