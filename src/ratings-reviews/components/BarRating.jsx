import React from 'react';

const BarRating = () => {
  const rate = 30;

  return (
    <div className='bar-wrapper'>
      <div className='bar-active' style={{ width: `${rate}%`}}></div>
      <div className='bar-inactive'></div>
    </div>
  )
}

export default BarRating;