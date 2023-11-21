import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

export default function AnswerList({ currAnswerList, serverURL, headers, totalAnswers, handleLoadMoreAnswersClick, handleCollapseAnswersClick }) {
  console.log(totalAnswers)
  return (
    <div className='answer-list-container'>
      {
        currAnswerList.map((answer) => {
          return <AnswerEntry key={answer.answer_id} answer={answer} serverURL={serverURL} headers={headers} />
        })
      }
      <div>{totalAnswers <= 2 && ''}</div>
      <div className='load-more-answers' onClick={handleLoadMoreAnswersClick}>{totalAnswers > 2 && currAnswerList.length < totalAnswers && 'Load More Answers'}</div>
      <div className='collapse-answers' onClick={handleCollapseAnswersClick}>{totalAnswers > 2 && currAnswerList.length === totalAnswers && 'Collapse Answers'}</div>
    </div>
  )
}