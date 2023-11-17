import React from 'react';
import StarRating from '../star-rating/StarRating.jsx';

const Reviews = ({ reviews }) => {
  var totalReviews = 0;
  var totalStars = 0;
  for (var starsGiven in reviews) {
    console.log(starsGiven, reviews[starsGiven])
    totalStars += starsGiven * reviews[starsGiven];
    totalReviews += reviews[starsGiven];
  }
  return (
    <div id='overview-reviews'>
      < StarRating rating={totalStars / totalReviews} />
      <p>See All {totalReviews} Reviews!</p>
    </div>
  );
}

export default Reviews;