import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

export default function AnswerList({
  currAnswerList,
  totalAnswers,
  handleLoadMoreAnswers,
  handleCollapseAnswers,
  isAnswerExpanded }) {
  return (
    <div className={`answer-list-container ${isAnswerExpanded && 'answer-list-container-expanded'}`}>
      {
        currAnswerList.map((answer) => {
          return <AnswerEntry key={answer.answer_id} answer={answer} />
        })
      }
      {
        totalAnswers > 2 && currAnswerList.length < totalAnswers &&
        <div className='load-more-answers' onClick={handleLoadMoreAnswers}>LOAD MORE ANSWERS</div>
      }
      {
        totalAnswers > 2 && currAnswerList.length === totalAnswers &&
        <div className='collapse-answers' onClick={handleCollapseAnswers}>COLLAPSE ANSWERS</div>
      }
    </div>
  )
}