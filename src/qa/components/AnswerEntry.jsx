import React, { useState } from 'react';
import { markAnswerHelpful, reportAnswer } from '../lib/fetchFunctions.js';
import { convertDate } from '../lib/helperFunctions.js';

const AnswerEntry = ({ answer }) => {
  const { answer_id, body, date, answerer_name, helpfulness, photos } = answer;
  const [isAnswerHelpful, setIsAnswerHelpful] = useState(false);
  const [updateAnswerHelpfulness, setUpdateAnswerHelpfulness] = useState(helpfulness);
  const [reported, setReported] = useState(false);

  const handleHelpfulAnswerClick = (id) => {
    if (!isAnswerHelpful) {
      markAnswerHelpful(id)
        .then(() => {
          setUpdateAnswerHelpfulness(updateAnswerHelpfulness + 1);
          setIsAnswerHelpful(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReportClick = (id) => {
    if (!reported) {
      reportAnswer(id)
        .then(() => {
          setReported(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='answer-container'>
      <p className='answer'>{body}</p>
      <div className='photos-container'>
        {photos.map((photo) => <img key={photo.id} className='answer-photos' src={photo.url} alt='Photos for answer' />)}
      </div>
      <div className='answer-details-container'>
        <div>
          by
          <span style={{ fontWeight: answerer_name === 'Seller' && 'bold' }}>
            {' '}
            {answerer_name}
          </span>
          ,
          {' '}
          {convertDate(date)}
        </div>
        |
        <div className='qa-helpful-container'>
          Helpful?
          <button
            type='button'
            id='helpful-answer'
            title='helpfulAnswer'
            style={{ textDecoration: isAnswerHelpful ? 'none' : 'underline', cursor: isAnswerHelpful && 'default' }}
            onClick={() => { handleHelpfulAnswerClick(answer_id); }}
          >
            Yes
          </button>
          (
          {updateAnswerHelpfulness}
          )
        </div>
        |
        <button
          type='button'
          id='report-answer'
          title='reportAnswer'
          style={{ textDecoration: reported ? 'none' : 'underline', cursor: reported && 'default' }}
          onClick={() => { handleReportClick(answer_id); }}
        >
          {reported ? 'Reported' : 'Report'}
        </button>
      </div>
    </div>
  );
};

export default AnswerEntry;
