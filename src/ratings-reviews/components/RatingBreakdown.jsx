import React, { useMemo, memo } from 'react';
import RatingList from './RatingList.jsx';
import { getAverageRating, getAverageRecommended, convertCharacteristics } from '../lib/utilityFunctions.js';
import StarRating from '../../components/star-rating/StarRating.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';

const RatingBreakdown = ({ data, total, handleStarFilter }) => {
  const averageRating = useMemo(() => getAverageRating(data.ratings, total), [data, total]);
  const averageRecommended = useMemo(() => getAverageRecommended(data.recommended, total), [data, total]);
  const propertyList = useMemo(() => convertCharacteristics(data.characteristics), [data]);

  return (
    <section className='breakdown-wrapper'>
      <div className='average-rating-breakdown'>
        <span>{averageRating.toString()}</span>
        <sup><StarRating rating={averageRating} /></sup>
      </div>
      <p style={{ marginLeft: '.2em' }}>
        {averageRecommended}
        % of reviews recommend this product
      </p>
      <RatingList ratings={data.ratings} total={total} handleStarFilter={handleStarFilter} />
      <ProductBreakdownList propertyList={propertyList} />
    </section>
  );
};

export default memo(RatingBreakdown);
