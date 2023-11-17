import React, { useState } from 'react';

export default function QuestionEntry({ question }) {
  const {question_id, question_body, question_date, asker_name, question_helpfulness} = question;
  const [answerList, setAnswerList] = useState([]);


  return (
    <div>
      <div>Q: {question_body}</div>
      <div>Helpful? Yes ({ question_helpfulness }) | Add Answer</div>
      <div>
        A: <AnswerList />
      </div>
    </div>
  );
};