import React from 'react';
import { v4 as key } from 'uuid';
import BarRating from '../utils/BarRating.jsx';

const RatingList = ({ ratings, handleStarFilter, total }) => {
  const allRatings = Array.from(Array(5));

  return (
    <section className='rating-list-container'>
      {ratings
        && allRatings.map((_, index) => {
          const rating = 5 - index;
          return (
            <div key={key()} className='bar-rating'>
              <button type='button' onClick={() => handleStarFilter(rating)}>
                {rating}
                {' '}
                stars
              </button>
              <BarRating rating={ratings[Math.round((JSON.parse(rating) / total) * 100)]} />
            </div>
          );
        })}
    </section>
  );
};

export default RatingList;
