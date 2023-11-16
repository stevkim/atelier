import React, { useMemo } from 'react';
import { convertRating } from './convertRating.js';
import './starRatingStyles.css'

const StarRating = ({ rating }) => {
  const activeRating = useMemo(() => convertRating(rating), [rating]);
  const starLength = Array.from(Array(5));

  return (
    <div className='star-rating-wrapper'>
      <div className='active-stars' style={{ width: `${activeRating}em` }}>
        {
          starLength.map((star, index) => {
            return <div key={`activestar${index}`} className='stars' aria-label='star'>&#9733;</div>
          })
        }
      </div>
      <div className='inactive-stars'>
        {
          starLength.map((star, index) => {
            return <div key={`graystar${index}`} className='stars' aria-label='star'>&#9733;</div>
          })
        }
      </div>
    </div>
  )
}

export default StarRating;