import React, { useEffect, useState, useMemo } from 'react';
import RatingList from './RatingList.jsx';
import { getAverageRating, getAverageRecommended, convertCharacterstics } from '../lib/utilityFunctions.js';
import StarRating from '../../components/star-rating/StarRating.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';

const RatingBreakdown = ({ data, total, handleStarFilter }) => {
  const [ratingList, setRatingList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);

  const averageRating = useMemo(() => getAverageRating(data.ratings, total), [data]);
  const averageRecommended = useMemo(() => getAverageRecommended(data.recommended, total), [data]);

  const parseData = () => {
    for(let keys in data.ratings) {
      data.ratings[keys] = Math.round(JSON.parse(data.ratings[keys]) / total * 100);
    }
    setPropertyList(convertCharacterstics(data.characteristics))
  };

  useEffect(() => {
    parseData();
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
