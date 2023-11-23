import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

export default function QuestionList({ currQuestionList, serverURL, headers, isQuestionExpanded }) {
  return (
    <div className={`question-list-container ${isQuestionExpanded && 'question-list-container-expanded'}`}>
      {
        currQuestionList.map((question) => {
          return <QuestionEntry key={question.question_id} question={question} serverURL={serverURL} headers={headers} />
        })
      }
    </div>
  )
}