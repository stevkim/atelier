import React from 'react';
import BarRating from './BarRating.jsx';

const RatingList = ({ ratings }) => {
  const allRatings = Array.from(Array(5));

  return (
    <div style={{ width: 'inherit' }}>
      {ratings &&
        allRatings.map((rating, index) => {
          let stars = 5 - index;
          return (
            <div key={`barrating${index}`} className='bar-rating'>
              <span style={{ whiteSpace: 'nowrap', marginRight: '1em'}}>{stars} stars</span><BarRating rating={ratings[stars]} />
            </div>
          )
        })
      }
    </div>
  )
}

export default RatingList;