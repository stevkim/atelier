import React, { useMemo } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import countStarsAndReviews from './helper-funcs/countReviews.js';

const Reviews = ({ product }) => {
  const reviewCounts = useMemo(() => countStarsAndReviews(product), [product]);

  return (
    <div className='overview-reviews'>
      <StarRating rating={reviewCounts.stars / reviewCounts.reviews} />
      <div>
        See All
        {' '}
        {reviewCounts.reviews}
        {' '}
        Reviews!
      </div>
    </div>
  );
};

export default Reviews;
