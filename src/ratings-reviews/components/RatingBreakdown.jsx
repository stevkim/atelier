import React, { useEffect, useState, useMemo } from 'react';
import RatingList from './RatingList.jsx';
import '../reviewStyles.css'
import { getAverageRating } from '../lib/getAverageRating.js';
import StarRating from '../../components/star-rating/StarRating.jsx';

const RatingBreakdown = ({ data, total }) => {
  const [ratingList, setRatingList] = useState([]);
  const [averageRecommended, setAverageRecommended] = useState(0);
  const averageRating = useMemo(() => getAverageRating(data.ratings, total), [data])

  useEffect(() => {
    console.log(getAverageRating(data.ratings, total));
    for(let keys in data.ratings) {
      data.ratings[keys] = Math.round(JSON.parse(data.ratings[keys]) / total * 100);
    }
    for (let keys in data.recommended) {
      if (keys === 'true') {
        setAverageRecommended(Math.round(JSON.parse(data.recommended[keys]) / total * 100));
      }
    }
  }, [data]);

  return (
    <section style={{ width: '30vw' }}>
      <div className='average-rating-breakdown'>
        <span>{averageRating}</span>
        <sup><StarRating rating={averageRating} /></sup>
      </div>
      <p>{averageRecommended}% of reviews recommend this product</p>
      <RatingList ratings={data.ratings} />
    </section>
  )
}

export default RatingBreakdown;
