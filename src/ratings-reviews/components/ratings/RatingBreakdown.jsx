import React, { useMemo, memo } from 'react';
import RatingList from './RatingList.jsx';
import { getAverageRating, getAverageRecommended, convertCharacteristics, getTotalReviewCount } from '../../lib/utilityFunctions.js';
import StarRating from '../../../components/star-rating/StarRating.jsx';
import ProductBreakdownList from './ProductBreakdownList.jsx';

const RatingBreakdown = ({ data, handleStarFilter }) => {
  const totalReviews = useMemo(() => getTotalReviewCount(data.recommend), [data]);
  const averageRating = useMemo(() => getAverageRating(data.rating, totalReviews), [data, totalReviews]);
  const averageRecommended = useMemo(() => getAverageRecommended(data.recommend, totalReviews), [data, totalReviews]);
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
      <RatingList ratings={data.rating} total={totalReviews} handleStarFilter={handleStarFilter} />
      <ProductBreakdownList propertyList={propertyList} />
    </section>
  );
};

export default memo(RatingBreakdown);
