import React, {memo} from 'react';
import { v4 as key } from 'uuid';
import './styles.css';

// import ShareButtons from './ShareButtons.jsx';

const Details = ({ productInfo }) => (
  <div aria-label='overviewDetails' className='overview-details' id='overview-details'>
    <h3 className='overview-slogan'>{productInfo.slogan}</h3>
    <p className='overview-description'>{productInfo.description}</p>
    <ul className='overview-feature-wrapper'>
      {productInfo.features && productInfo.features.map((feat) => (
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

export default memo(Details);
