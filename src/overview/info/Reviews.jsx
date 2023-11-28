import React, { useEffect } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import countStarsAndReviews from './helper-funcs/countReviews.js';

const Reviews = ({ product }) => {
  const reviewCounts = countStarsAndReviews(product);

  return (
    <div className='overview-reviews'>
      <StarRating rating={reviewCounts.stars / reviewCounts.reviews} />
      <div>
        See All
        {reviewCounts.reviews}
        {' '}
        Reviews!
      </div>
    </div>
  );
};

export default Reviews;
