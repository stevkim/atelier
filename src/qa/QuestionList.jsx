import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

export default function QuestionList({ currQuestionList, isQuestionExpanded, term }) {
  return (
    <div className={`question-list-container ${isQuestionExpanded && 'question-list-container-expanded'}`}>
      {
        currQuestionList
          .filter((question) => (term.toLowerCase() === ''
            ? question
            : question.question_body.toLowerCase().includes(term)))
          .map((question) => <QuestionEntry key={question.question_id} question={question} />)
      }
    </div>
  );
}
