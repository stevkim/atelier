import React from 'react';
import Title from './Title.jsx';
import Category from './Category.jsx';
import Details from './Details.jsx';
import Reviews from './Reviews.jsx';
import StyleWrapper from './StyleWrapper.jsx';

import './styles.css';
import product from './product-example.js';

/*
  Note how easy this would be easy to refactor. If we were to break up our input
  into 3 separate objects, for example, this component is all that would have to be
  changed.
*/

const Overview = () => {
  return (
    <div className='overview'>
      < Title title={product.title} />
      < Category category={product.category} />

      < Details
        slogan={product.slogan}
        description={product.description}
        features={product.features} />

      {/* TODO: Use Steven Powers */}
      {< Reviews reviews={product.reviews} />}

      {/* This is a wrapper to prevent excessive rendering due to a style change. */}
      < StyleWrapper styles={product.styles} />
    </div>
  );
}

export default Overview;