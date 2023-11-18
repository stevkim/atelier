import React from 'react';
import QuestionsAndAnswers from './qa/QuestionsAndAnswers.jsx';
import Overview from './components/overview/Overview.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import RelatedProductsAndComparison from './components/related-products-and-comparison/RelatedProductsAndComparison.jsx';

const App = () => {
  return (
    <div>
      <Overview />
      <RelatedProductsAndComparison />
      <QuestionsAndAnswers />
      <RatingsReviews />
    </div>
  )
}

export default App;