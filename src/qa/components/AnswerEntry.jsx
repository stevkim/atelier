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
      <p>{body}</p>
      <div className='photos-container'>
        {photos.map((photo) => <img key={photo.id} src={photo.url} alt='Photos for answer' />)}
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
        <div className='qa-helpful-container'>
          <button
            type='button'
            className='qa-icon-button'
            aria-label='Upvote Answer'
            style={{ textDecoration: isAnswerHelpful ? 'none' : 'underline', cursor: isAnswerHelpful && 'default' }}
            onClick={() => { handleHelpfulAnswerClick(answer_id); }}
          >
            {
              isAnswerHelpful
                ? (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='qa-helpful qa-fill' title='AnswerIsHelpful'>
                    <path d='M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z' />
                  </svg>
                )
                : (
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='qa-helpful' title='IsAnswerHelpful'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z' />
                  </svg>
                )
            }
          </button>
          <span>{updateAnswerHelpfulness}</span>
        </div>
        <div className='qa-helpful-container'>
          <button
            type='button'
            aria-label='Report Answer'
            className='qa-icon-button'
            style={{ cursor: reported && 'default' }}
            onClick={() => { handleReportClick(answer_id); }}
          >
            {
              reported
                ? (
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='report-answer qa-fill' title='ReportedAnswer'>
                    <path fillRule='evenodd' d='M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z' clipRule='evenodd' />
                  </svg>
                )
                : (
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='report-answer' title='ReportAnswer'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5' />
                  </svg>
                )
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerEntry;
