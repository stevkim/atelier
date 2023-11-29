import React from 'react';

const ReviewItemResponse = ({ response }) => (
  <div className='review-response'>
    <span style={{ fontWeight: 600 }}>Reponse from Seller:</span>
    <span style={{ textIndent: '1em' }}>{response}</span>
  </div>
);

export default ReviewItemResponse;
