import React, { useEffect } from 'react';
import BarRating from './BarRating.jsx';
import '../reviewStyles.css'

const RatingBreakdown = ({ data, total }) => {
  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    <section style={{ width: '30vw' }}>
      <BarRating />
    </section>
  )
}

export default RatingBreakdown;