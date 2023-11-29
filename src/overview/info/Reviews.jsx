import React, { useMemo } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import countStarsAndReviews from './helper-funcs/countReviews.js';

const Reviews = ({ reviewsMetaData }) => {
  const reviewCounts = useMemo(() => countStarsAndReviews(reviewsMetaData), [reviewsMetaData]);

  return (
    <div aria-label='reviews' className='overview-reviews'>
      <StarRating rating={reviewCounts.stars / reviewCounts.reviews} />
      <a href='#ratings-reviews'>
        See All
        {' '}
        {reviewCounts.reviews}
        {' '}
        Reviews!
      </a>
      <br />
    </div>
  );
};

export default Reviews;
