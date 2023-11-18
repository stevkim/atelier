import React, { useState, useEffect } from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewsList = ({ reviewList, setCurrentSort, handleListIncrement, totalReviews }) => {

  return (
    <section>
      <div className='review-list-header'>
        {totalReviews} reviews, sorted by
        <select className='review-sort-options' onChange={(e) => setCurrentSort(e.target.value)}>
          <option value='relevant'>Relevance</option>
          <option value='newest'>Newest</option>
          <option value='helpful'>Most Helpful</option>
        </select>
      </div>
      <div className='review-list-container'>
        {
          reviewList.map(review => {
            return <ReviewItem key={review.review_id} review={review} />
          })
        }
        <div className='review-list-button-wrapper'>
          <div className='more-reviews-button' onClick={handleListIncrement}> MORE REVIEWS </div>
          <div className='add-review-button'>ADD A REVIEW + </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewsList;