import React from 'react';
import BarRating from './BarRating.jsx';

const RatingList = ({ ratings, handleStarFilter }) => {
  const allRatings = Array.from(Array(5));

  return (
    <div className='rating-list-container'>
      {ratings &&
        allRatings.map((rating, index) => {
          let stars = 5 - index;
          return (
            <div key={`barrating${index}`} className='bar-rating'>
              <span onClick={() => handleStarFilter(stars)}>{stars} stars</span><BarRating rating={ratings[stars]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default RatingList;