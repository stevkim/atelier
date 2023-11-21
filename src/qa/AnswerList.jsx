import React from 'react';
import AnswerEntry from './AnswerEntry.jsx';

export default function AnswerList({ answerList, serverURL, headers }) {
  return (
    <div>
      {
        answerList.map((answer) => {
          return <AnswerEntry key={answer.answer_id} answer={answer} serverURL={serverURL} headers={headers} />
        })
      }
    </div>
  )
}