import React, { useState, useEffect } from 'react';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import { getReviewMetaData } from './ratings-reviews/lib/fetchFunctions.js';
import Navbar from './components/navbar/Navbar.jsx';

const App = () => {
  const [currentProductId, setCurrentProductId] = useState(486887);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('product_id');
    if (id) {
      setCurrentProductId(id);
    }
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      const meta = await getReviewMetaData(currentProductId);
      setMetaData(await meta.data);
    };
    getInfo();
  }, [currentProductId]);

  return (
    <div>
      <Navbar />
      <RatingsReviews id={currentProductId} metaData={metaData} />
    </div>
  );
};

export default App;
