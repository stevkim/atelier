import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

const AnswerList = ({ currAnswerList, totalAnswers, handleLoadMoreAnswers, handleCollapseAnswers, isAnswerExpanded }) => (
  <div className={`answer-list-container${isAnswerExpanded ? '-expanded' : ''}`}>
    {
      currAnswerList.map((answer) => <AnswerEntry key={answer.answer_id} answer={answer} />)
    }
    {
      totalAnswers > 2 && currAnswerList.length < totalAnswers
      && (
        <button
          type='button'
          id='load-more-answers'
          onClick={handleLoadMoreAnswers}
        >
          LOAD MORE ANSWERS
        </button>
      )
    }
    {
      totalAnswers > 2 && currAnswerList.length === totalAnswers
      && (
        <button
          type='button'
          id='collapse-answers'
          onClick={handleCollapseAnswers}
        >
          COLLAPSE ANSWERS
        </button>
      )
    }
  </div>
);

export default AnswerList;
