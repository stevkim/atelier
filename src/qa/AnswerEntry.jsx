import React, { useState } from 'react';
import axios from 'axios';
import { convertDate } from './convertDate.js';

require('dotenv').config();

export default function AnswerEntry({ answer }) {
  const {
    answer_id, body, date, answerer_name, helpfulness, photos,
  } = answer;
  const [isAnswerHelpful, setIsAnswerHelpful] = useState(false);
  const [updateAnswerHelpfulness, setUpdateAnswerHelpfulness] = useState(helpfulness);
  const [reported, setReported] = useState(false);

  const handleHelpfulAnswerClick = (id) => {
    if (!isAnswerHelpful) {
      axios.put(`/qa/answers/${id}/helpful`, null)
        .then((response) => {
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
      axios.put(`/qa/answers/${id}/report`, null)
        .then(() => {
          setReported(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="answer-container">
      <p className="answer">{body}</p>
      <div className="photos-container">
        {photos.map((photo) => <img key={photo.id} className="answer-photos" src={photo.url} alt="Photos for answer" />)}
      </div>
      <div className="answer-details-container">
        <span>
          by
          {' '}
          <span style={{ fontWeight: answerer_name === 'Seller' && 'bold' }}>{answerer_name}</span>
          ,
          {' '}
          <span>{convertDate(date)}</span>
        </span>
        |
        <span className="helpful-container">
          <span>Helpful?</span>
          <span
            className="yes"
            style={{ textDecoration: isAnswerHelpful ? 'none' : 'underline', cursor: isAnswerHelpful && 'default' }}
            onClick={() => { handleHelpfulAnswerClick(answer_id); }}
          >
            Yes
          </span>
          <span>
            (
            {updateAnswerHelpfulness}
            )
          </span>
        </span>
        |
        <span
          title="Report"
          className="report"
          style={{ textDecoration: reported ? 'none' : 'underline', cursor: reported && 'default' }}
          onClick={() => { handleReportClick(answer_id); }}
        >
          {reported ? 'Reported' : 'Report'}
        </span>
      </div>

    </div>
  );
}
