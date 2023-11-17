import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList.jsx';
import { questions } from './sampleData.js';

export default function QNA() {
  const [questionList, setQuestionList] = useState([]);

  // Keep in mind that by default there should only be 2 questions displayed
  // in the order of most helpful to least helpful
  useEffect(() => {
    setQuestionList(questions.results);
  }, []);

  return (
    <div>
      <h4>QUESTIONS AND ANSWERS</h4>
      {questionList.length > 0 && <QuestionList questionList={questionList}/>}
    </div>
  );
};