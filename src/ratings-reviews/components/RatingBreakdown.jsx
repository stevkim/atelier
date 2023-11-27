import React, { useEffect, useState, useMemo, memo } from 'react';
import RatingList from './RatingList.jsx';
import { getAverageRating, getAverageRecommended, convertCharacterstics } from '../lib/utilityFunctions.js';
import StarRating from '../../components/star-rating/StarRating.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';

const RatingBreakdown = ({ data, total, handleStarFilter }) => {
  const averageRating = useMemo(() => getAverageRating(data.ratings, total), [data]);
  const averageRecommended = useMemo(() => getAverageRecommended(data.recommended, total), [data]);
  const propertyList = useMemo(() => convertCharacterstics(data.characteristics), [data]);

  return (
    <section className='breakdown-wrapper'>
      <div className='average-rating-breakdown'>
        <span>{averageRating.toString()}</span>
        <sup><StarRating rating={averageRating} /></sup>
      </div>
      <p>{averageRecommended}% of reviews recommend this product</p>
      <RatingList ratings={data.ratings} total={total} handleStarFilter={handleStarFilter}/>
      <ProductBreakdownList propertyList={propertyList} />
    </section>
  )
}

export default memo(RatingBreakdown);
