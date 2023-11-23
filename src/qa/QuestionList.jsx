import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

export default function QuestionList({ currQuestionList, serverURL, headers }) {
  return (
    <div className='question-list-container'>
      {
        currQuestionList.map((question) => {
          return <QuestionEntry key={question.question_id} question={question} serverURL={serverURL} headers={headers} />
        })
      }
    </div>
  )
}