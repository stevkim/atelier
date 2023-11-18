import React, { useState, useEffect, useMemo } from 'react';
import StarRating from '../../components/star-rating/StarRating.jsx';
import { updateHelpfulness, reportReview } from '../lib/fetchFunctions.js';
import { convertDate } from '../lib/convertDate.js';


const ReviewItem = ({ review, getList }) => {
  const { reviewer_name, rating, email, date, summary, response,
    body, photos, recommend, helpfulness, review_id } = review;

  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(true);
  const [helpful, setHelpful] = useState(helpfulness);
  const formattedDate = useMemo(() => convertDate(date), [date]);

  useEffect(() => {
    if (body.length > 250) {
      setShow(false);
    }
  }, [])

  const handleHelpfulClick = (id) => {
    if (clicked) return;
    updateHelpfulness(id)
      .then(result => {
        setClicked(true);
        setHelpful(helpful + 1);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleReportClick = (id) => {
    if (clicked) return;
    reportReview(id)
      .then(result => {
        setClicked(true);
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='review-wrapper'>
      <div className='review-header'>
        <StarRating rating={rating} />
        <div style={{ marginLeft: 'auto' }}>
          {email && <span>&#10003;</span>}
          {reviewer_name}, {formattedDate}
        </div>
      </div>

      <div className='review-summary'> {summary} </div>

      <div className='review-body'>
        {show
          ? <div>{body}</div>
          : <div>
              {body.slice(0,250)}...
              <div className='show-more-button' onClick={() => setShow(true)}>Show more</div>
            </div>
        }
      </div>
      {
        photos.map(photo => {
          return <img src={photo.url} key={photo.id} alt='Reviewer picture' width='150px'/>
        })
      }

      {recommend && <div>&#10003; I recommend this product</div>}

      {response &&
        <div className='review-response'>
          <span style={{ fontWeight: 600 }}>Reponse from Seller:</span>
          <span style={{ textIndent: '1em' }}>{response}</span>
        </div>
      }

      <div className='helpfulness-wrapper'> Helpful?
        <span className='helpful-review' onClick={() => handleHelpfulClick(review_id)}>Yes</span>
        ({helpful})  |{' '}
        <span onClick={() => handleReportClick(review_id)}>Report</span>
      </div>
    </div>
  )
}

export default ReviewItem;

/// need to make body cap out at 250 characters;

