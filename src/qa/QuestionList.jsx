import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

export default function QuestionList({ currQuestionList, serverURL, headers, isQuestionExpanded, term }) {
  return (
    <div className={`question-list-container ${isQuestionExpanded && 'question-list-container-expanded'}`}>
      {
        currQuestionList
          .filter((question) => {
            return term.toLowerCase() === ''
            ? question
            : question.question_body.toLowerCase().includes(term)
          })
          .map((question) => {
            return <QuestionEntry key={question.question_id} question={question} serverURL={serverURL} headers={headers} />
          })
      }
    </div>
  )
}