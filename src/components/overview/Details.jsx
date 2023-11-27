import React from 'react';
import Reviews from './Reviews.jsx';
import ImageView from './ImageView.jsx';
import StylesView from './StylesView.jsx';
import Price from './Price.jsx';
import AddToCart from './AddToCart.jsx';
// import ShareButtons from './ShareButtons.jsx';

const Details = ({ product }) => (
  <div className='overview-details'>
    <h3 className='overview-slogan'>{product.slogan}</h3>
    <p className='overview-description'>{product.description}</p>
    <ul className='overview-feature-wrapper'>
      {product.features.map((feat, index) => (
        <li className='overview-feature' key={`overview-details-${index}`}>
          The
          {' '}
          {feat.feature}
          {' '}
          is
          {' '}
          {feat.value}
          !
        </li>
      ))}
    </ul>
  </div>
);

export default Details;
