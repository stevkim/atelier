import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewsList = ({ reviewList }) => {
  return (
    <section>
      {
        reviewList.map(review => {
          return <ReviewItem key={review.review_id} review={review} />
        })
      }
    </section>
  )
}

export default ReviewsList;