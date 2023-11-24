import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList.jsx';
import axios from 'axios';
import './qaStyles.css';

export default function QuestionsAndAnswers({ productId }) {
  const [currQuestionList, setCurrQuestionList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [displayCount, setDisplayCount] = useState(2);
  const [term, setTerm] = useState('');

  const handleMoreQuestions = () => {
    totalQuestions !== displayCount &&
    setDisplayCount(displayCount + 2);
    setIsQuestionExpanded(true);
  };

  const handleInputChange = (e) => {
    e.target.value.length >= 3
    ? setTerm(e.target.value)
    : setTerm('');
  };

  useEffect(() => {
    axios.get(`/qa/questions/?product_id=${productId}&count=20`)
      .then((response) => {
        setTotalQuestions(response.data.results.length);
        setQuestionList(response.data.results);
        setCurrQuestionList(response.data.results.slice(0, displayCount));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [displayCount]);

  return (
    <div className='qa-container'>
      <h4>QUESTIONS AND ANSWERS</h4>
      <div className='search-container'>
        <input
          type='text'
          name='Search'
          placeholder='Have a question? Search for answers...'
          onChange={handleInputChange}>
        </input>
      </div>
      <QuestionList
        currQuestionList={currQuestionList}
        isQuestionExpanded={isQuestionExpanded}
        term={term}
      />
      <div className='button-container'>
        {
          totalQuestions > 2 && currQuestionList.length < totalQuestions &&
          <button onClick={handleMoreQuestions}>More Answered Questions</button>
        }
        <button>Add A Question</button>
      </div>
    </div>
  )
}