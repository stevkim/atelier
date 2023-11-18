require('dotenv').config();
import React, { useState } from 'react';
import axios from 'axios';

export default function AnswerEntry({ answer, serverURL, headers }) {
  const {answer_id, body, date, answerer_name, helpfulness, photos} = answer;
  const [isHelpful, setIsHelpful] = useState(false);
  const [updateHelpfulness, setUpdateHelpfulness] = useState(helpfulness);
  const [reported, setReported] = useState(false);


  const convertDate = (date) => {
    const newDate = new Date(date.split('T')[0]);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return newDate.toLocaleDateString('en-US', options);
  };

  const handleHelpfulClick = (id) => {
    if (!isHelpful) {
      axios.put(`${serverURL}/qa/answers/${id}/helpful`, null, { headers: headers })
        .then((response) => {
          setUpdateHelpfulness(updateHelpfulness + 1);
          setIsHelpful(true);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const handleReportClick = (id) => {
    if (!reported) {
      axios.put(`${serverURL}/qa/answers/${id}/report`, null, { headers: headers })
        .then(() => {
          setReported(true);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <div className='answer-container'>
      <p>{body}</p>
      <div className='answer-details-container'>
        <span>by {answerer_name}, {convertDate(date)}</span>|
        <span className='helpful-container'>
          <span>Helpful?</span>
          <span
          className='yes'
            style={{textDecoration: isHelpful ? 'none' : 'underline', cursor: isHelpful && 'default'}}
            onClick={() => {handleHelpfulClick(answer_id)}}>Yes</span>({updateHelpfulness})
          </span>|
        <span
          className='report'
          style={{textDecoration: reported ? 'none' : 'underline', cursor: reported && 'default'}}
          onClick={() => {handleReportClick(answer_id)}}>{reported ? 'Reported' : 'Report'}</span>
      </div>

    </div>
  )
}