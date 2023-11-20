import React from 'react';

const BarRating = ({ rating }) => {
  return (
    <div className='bar-wrapper'>
      <div className='bar-active' style={{ width: `${rating}%`}}></div>
      <div className='bar-inactive'></div>
    </div>
  )
}

export default BarRating;