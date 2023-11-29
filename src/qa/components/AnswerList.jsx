import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

const AnswerList = ({ currAnswerList, totalAnswers, handleLoadMoreAnswers, handleCollapseAnswers, isAnswerExpanded }) => (
  <div className={isAnswerExpanded ? 'answer-list-container-expanded' : 'answer-list-container'}>
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
