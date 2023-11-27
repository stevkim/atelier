import React, { useEffect } from 'react';
import StarRating from '../star-rating/StarRating.jsx';

const Reviews = ({ product }) => {
  let totalReviews = 0;
  let totalStars = 0;

  useEffect(() => {
    for (const starsGiven in product.reviews) {
      totalStars += (starsGiven * product.reviews[starsGiven]);
      totalReviews += Number(product.reviews[starsGiven]);
    }
  }, [product]);

  return (
    <div className='overview-reviews'>
      <StarRating rating={totalStars / totalReviews} />
      <div>
        See All
        {totalReviews}
        {' '}
        Reviews!
      </div>
    </div>
  );
};

export default Reviews;
