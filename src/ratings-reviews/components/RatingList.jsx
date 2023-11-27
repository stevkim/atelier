import React from 'react';
import BarRating from '../utils/BarRating.jsx';

const RatingList = ({ ratings, handleStarFilter, total }) => {
  const allRatings = Array.from(Array(5));

  return (
    <div className="rating-list-container">
      {ratings
        && allRatings.map((_, index) => {
          const rating = 5 - index;
          return (
            <div key={`barrating${index}`} className="bar-rating">
              <span onClick={() => handleStarFilter(rating)}>
                {rating}
                {' '}
                stars
              </span>
              <BarRating rating={ratings[Math.round(JSON.parse(rating) / total * 100)]} />
            </div>
          );
        })}
    </div>
  );
};

export default RatingList;
