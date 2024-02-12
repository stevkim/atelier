import React from 'react';

const ReviewItemResponse = ({ response }) => (
  <div className='review-response'>
    <span style={{ fontWeight: 600 }}>Response from Seller:</span>
    <span style={{ textIndent: '1em' }}>{response}</span>
  </div>
);

export default ReviewItemResponse;
