import React from 'react';
import { v4 as key } from 'uuid';
import './styles.css';

// import ShareButtons from './ShareButtons.jsx';

const Details = ({ product }) => (
  <div className='overview-details' id='overview-details'>
    <h3 className='overview-slogan'>{product.slogan}</h3>
    <p className='overview-description'>{product.description}</p>
    <ul className='overview-feature-wrapper'>
      {product.features.map((feat) => (
        <li className='overview-feature' key={key()}>
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
