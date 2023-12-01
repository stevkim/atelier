import React from 'react';
import Reviews from './Reviews.jsx';
import StylesView from './StylesView.jsx';
import Price from '../../components/price/Price.jsx';
import AddToCart from './addToCart/AddToCart.jsx';
import Share from './Share.jsx';
import './styles.css';

const Info = ({ productId, productInfo, reviewsMetaData, styleInfo, style, selectedStyle, updateStyle }) => (
  <div aria-label='info' className='overview-overview'>
    <Reviews reviewsMetaData={reviewsMetaData} />
    <div aria-label='category' className='overview-category'>
      {productInfo.category || 'Loading Category...'}
    </div>
    <h3 aria-label='title' className='overview-title'>{productInfo.name || 'Loading Title...'}</h3>
    <Price selectedStyle={selectedStyle} includeStyle />
    <StylesView styleIndex={style} styleInfo={styleInfo} updateStyle={updateStyle} />
    <AddToCart skus={selectedStyle?.skus || {}} />
    <Share id={productId} />
  </div>
);

export default Info;
