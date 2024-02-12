import React, { useState, useEffect, useMemo, memo } from 'react';
import StarRating from '../../../components/star-rating/StarRating.jsx';
import { updateHelpfulness, reportReview } from '../../lib/fetchFunctions.js';
import { convertDate } from '../../lib/utilityFunctions.js';
import ReviewItemResponse from './ReviewItemResponse.jsx';
import ReviewItemRecommend from './ReviewItemRecommend.jsx';
import ReviewItemImages from './ReviewItemImages.jsx';

const ReviewItem = ({ review }) => {
  const {
    reviewer_name, rating, email, date, summary, response,
    body, photos, recommend, helpfulness, review_id,
  } = review;

  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(true);
  const [helpful, setHelpful] = useState(helpfulness);
  const formattedDate = useMemo(() => convertDate(date), [date]);

  useEffect(() => {
    body.length > 250 ? setShow(false) : setShow(true);
  }, [body.length]);

  const handleHelpfulClick = (id) => {
    if (clicked) return;
    updateHelpfulness(id)
      .then(() => {
        setHelpful(helpful + 1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setClicked(true);
      });
  };

  const handleReportClick = (id) => {
    if (clicked) return;
    reportReview(id)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setClicked(true);
      });
  };

  return (
    <div className='review-wrapper'>
      <div className='review-header'>
        <StarRating rating={rating} />
        <div style={{ marginLeft: 'auto' }}>
          {email && <>&#10003;</>}
          <span style={{ fontWeight: 'bold' }}>{reviewer_name}</span>
          {', '}
          {formattedDate}
        </div>
      </div>
      <div className='review-summary'>{summary}</div>
      <div className='review-body'>
        {show
          ? body
          : (
            <>
              {body.slice(0, 250)}
              ...
              <button type='button' className='show-more-button' onClick={() => setShow(true)}>Show more</button>
            </>
          )}
      </div>
      <ReviewItemImages photos={photos} />
      {recommend && <ReviewItemRecommend />}
      {response && <ReviewItemResponse response={response} />}
      <div className='helpfulness-wrapper' data-testid='helpful'>
        Helpful?
        <button
          type='button'
          className='helpful-review'
          onClick={() => handleHelpfulClick(review_id)}
        >
          Yes
        </button>
        {`(${helpful}) | `}
        <button type='button' onClick={() => handleReportClick(review_id)}>Report</button>
      </div>
    </div>
  );
};

export default memo(ReviewItem);
