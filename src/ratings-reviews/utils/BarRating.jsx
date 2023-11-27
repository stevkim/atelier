import React, { memo } from 'react';
import './utilStyles.css';

const BarRating = ({ rating }) => (
  <div className="bar-wrapper">
    <div className="bar-active" style={{ width: `${rating}%` }} />
    <div className="bar-inactive" />
  </div>
);

export default memo(BarRating);
