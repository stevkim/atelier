import React from 'react';
import BarRating from '../utils/BarRating.jsx';

const RatingList = ({ ratings, handleStarFilter }) => {
  const allRatings = Array.from(Array(5));

  return (
    <div className='rating-list-container'>
      {ratings &&
        allRatings.map((_, index) => {
          let rating = 5 - index;
          return (
            <div key={`barrating${index}`} className='bar-rating'>
              <span onClick={() => handleStarFilter(rating)}>
                {rating} stars
              </span>
              <BarRating rating={ratings[rating]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default RatingList;