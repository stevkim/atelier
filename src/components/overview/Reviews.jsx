import React from 'react';
import StarRating from '../star-rating/StarRating.jsx';

const Reviews = ({ product }) => {
  var totalReviews = 0;
  var totalStars = 0;
  for (var starsGiven in product.reviews) {
    totalStars += (starsGiven * product.reviews[starsGiven]);
    totalReviews += Number(product.reviews[starsGiven]);
  }
  return (
    <div className='overview-reviews'>
      <span>
        < StarRating rating={totalStars / totalReviews} />
        See All {totalReviews} Reviews!
      </span>
    </div>
  );
}

export default Reviews;