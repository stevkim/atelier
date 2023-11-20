import React from 'react';
import Overview from './components/overview/Overview.jsx';
import product from './components/overview/product-example.js';
import StarRating from './components/star-rating/StarRating.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import RelatedProductsAndComparison from './components/related-products-and-comparison/RelatedProductsAndComparison.jsx';

const App = () => {
  return (
    <div>
      <Overview product={product} />
      <RelatedProductsAndComparison />
      <RatingsReviews />
    </div>
  )
}

export default App;