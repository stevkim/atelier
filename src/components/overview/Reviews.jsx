import React from 'react';
import StarRating from '../star-rating/StarRating.jsx';

const Reviews = ({ reviews }) => {
  var totalReviews = 0;
  var totalStars = 0;
  for (var starsGiven in reviews) {
    totalStars += (starsGiven * reviews[starsGiven]);
    console.log('totalStars: ' + totalStars + '. Made with ' + starsGiven + '*' + reviews[starsGiven]);
    totalReviews += Number(reviews[starsGiven]);
    console.log('totalReviews:' + totalReviews);
  }
  return (
    <div className='overview-reviews'>
      < StarRating rating={totalStars / totalReviews} />
      <p>See All {totalReviews} Reviews!</p>
    </div>
  );
}

export default Reviews;