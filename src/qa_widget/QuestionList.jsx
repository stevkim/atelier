import React from 'react';
import QuestionEntry from './QuestionEntry.jsx';

export default function QuestionList({ questionList }) {
  return (
    <div>
      {questionList.map((question) => {
        return <QuestionEntry key={question.question_id} question={question} />
      })}
    </div>
  );
};