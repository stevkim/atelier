import React, { useState, useEffect } from 'react';
import { reviews } from './data.js';
import ReviewsList from './components/ReviewsList.jsx';
import './reviewStyles.css';

const RatingsReviews = () => {
  const [reviewList, setReviewList] = useState([])

  useEffect(() => {
    setReviewList(reviews.results);
  }, [])

  return (
    <div>
      {reviewList.length > 0 && <ReviewsList reviewList={reviewList} />}
    </div>
  )
}

export default RatingsReviews;