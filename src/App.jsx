import React, { useState, useEffect, Suspense, lazy } from 'react';
import QuestionsAndAnswers from './qa/QuestionsAndAnswers.jsx';
// import Overview from './overview/Overview.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import RelatedProductsAndComparison from './related-products-and-comparison/RelatedProductsAndComparison.jsx';
import { getProductInfo } from './overview/helper-funcs/axios-requests.js';
import { getReviewMetaData } from './ratings-reviews/lib/fetchFunctions.js';

const Overview = lazy(() => import('./overview/Overview.jsx'));

const App = () => {
  const [currentProductId, setCurrentProductId] = useState(40347);
  const [metaData, setMetaData] = useState({});
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const [product, meta] = await Promise.all([getProductInfo(currentProductId), getReviewMetaData(currentProductId)]);
      setMetaData(meta.data);
      setProductInfo(product.data);
    };
    getInfo();
  }, [currentProductId]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Overview productId={currentProductId} reviewsMetaData={metaData} productInfo={productInfo} />
        <RelatedProductsAndComparison
          currentProduct={currentProductId}
          setCurrentProduct={setCurrentProductId}
          currentProductFeatures={productInfo.features}
        />
        <QuestionsAndAnswers productId={currentProductId} productName={productInfo.name} />
        <RatingsReviews id={currentProductId} productName={productInfo.name} metaData={metaData} />
      </Suspense>
    </div>
  );
};

export default App;
