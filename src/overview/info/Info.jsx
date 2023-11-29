import React from 'react';
import Reviews from './Reviews.jsx';
import StylesView from './StylesView.jsx';
import Price from '../../components/price/Price.jsx';
import AddToCart from './addToCart/AddToCart.jsx';
import './styles.css';

const Info = ({ productInfo, reviewsMetaData, styleInfo, style, selectedStyle, updateStyle }) => (
  <div aria-label='info' className='overview-overview'>
    <Reviews reviewsMetaData={reviewsMetaData} />
    <div aria-label='category' className='overview-category'>
      {productInfo.category}
    </div>
    <h3 aria-label='title' className='overview-title'>{productInfo.name}</h3>
    <Price selectedStyle={selectedStyle} includeStyle />
    <StylesView styleIndex={style} styleInfo={styleInfo} updateStyle={updateStyle} />
    <AddToCart skus={selectedStyle.skus || {}} />
    <div aria-label='shareButtons' className='overview-share-buttons'>
      <button className='share-facebook' type='button'>f</button>
      <button className='share-x' type='button'>x</button>
      <button className='share-pinterest' type='button'>P</button>
    </div>
  </div>
);

export default Info;
