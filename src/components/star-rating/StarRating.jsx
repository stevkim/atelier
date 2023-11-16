import React, { useMemo } from 'react';
import { convertRating } from './convertRating.js';
import './starRatingStyles.css'

const StarRating = ({ rating }) => {
  const activeRating = useMemo(() => convertRating(rating), [rating]);

  return (
    <div className='star-rating-wrapper'>
      <div className='active-stars' style={{ width: `${activeRating}em` }}>
        {
          Array.from(Array(5)).map((star, index) => {
            return <div key={`activestar${index}`} className='stars' aria-label='star'>&#9733;</div>
          })
        }
      </div>
      <div className='inactive-stars'>
        {
          Array.from(Array(5)).map((star, index) => {
            return <div key={`graystar${index}`} className='stars' aria-label='star'>&#9733;</div>
          })
        }
      </div>
    </div>
  )
}

export default StarRating;