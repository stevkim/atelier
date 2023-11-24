import React, { useState } from 'react';
import QuestionsAndAnswers from './qa/QuestionsAndAnswers.jsx';
import Overview from './components/overview/Overview.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import RelatedProductsAndComparison from './components/related-products-and-comparison/RelatedProductsAndComparison.jsx';

const App = () => {
  const [currentProduct, setCurrentProduct] = useState(40347);

  return (
    <div>
      <Overview productId={currentProduct} />
      <RelatedProductsAndComparison currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
      <QuestionsAndAnswers productId={currentProduct} />
      <RatingsReviews id={currentProduct} />
    </div>
  )
}

export default App;