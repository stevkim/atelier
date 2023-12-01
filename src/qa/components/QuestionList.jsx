import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionList = ({ currQuestionList, isQuestionExpanded, productName }) => (
  <div className={isQuestionExpanded ? 'question-list-container-expanded' : 'question-list-container'}>
    {
      currQuestionList
        .map((question) => <QuestionEntry key={question.question_id} question={question} productName={productName} />)
    }
  </div>
);

export default QuestionList;
