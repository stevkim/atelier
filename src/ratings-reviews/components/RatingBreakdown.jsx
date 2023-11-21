import React, { useEffect, useState, useMemo } from 'react';
import RatingList from './RatingList.jsx';
import '../reviewStyles.css'
import { getAverageRating } from '../lib/getAverageRating.js';
import StarRating from '../../components/star-rating/StarRating.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';

const RatingBreakdown = ({ data, total, handleStarFilter }) => {
  const [ratingList, setRatingList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [averageRecommended, setAverageRecommended] = useState(0);
  const averageRating = useMemo(() => getAverageRating(data.ratings, total), [data])

  useEffect(() => {
    for(let keys in data.ratings) {
      data.ratings[keys] = Math.round(JSON.parse(data.ratings[keys]) / total * 100);
    }
    for (let keys in data.recommended) {
      if (keys === 'true') {
        setAverageRecommended(Math.round(JSON.parse(data.recommended[keys]) / total * 100));
      }
    }
    let characteristics = [];
    for (let keys in data.characteristics) {
      characteristics.push({
        'id': data.characteristics[keys].id,
        'characteristic': keys,
        'rating': data.characteristics[keys].value
      })
    }
    setPropertyList(characteristics);
  }, [data]);

  return (
    <section className='breakdown-wrapper'>
      <div className='average-rating-breakdown'>
        <span>{averageRating.toString()}</span>
        <sup><StarRating rating={averageRating} /></sup>
      </div>
      <p>{averageRecommended}% of reviews recommend this product</p>
      <RatingList ratings={data.ratings} handleStarFilter={handleStarFilter}/>
      <ProductBreakdownList propertyList={propertyList} />
    </section>
  )
}

export default RatingBreakdown;
