require('dotenv').config();
import React, { useState, useEffect } from 'react';
import AnswerList from './AnswerList.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import axios from 'axios';
import './qaStyles.css';

export default function QuestionsAndAnswers() {
  const [currAnswerList, setCurrAnswerList] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [count, setCount] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);

  const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
  const headers = { Authorization: process.env.GIT_TOKEN };

  useEffect(() => {
    axios.get(`${serverURL}/qa/questions`, {
      headers: headers,
      params: {
        product_id: 40344
      }
    })
      .then((response) => {
        const answerObj = response.data.results[0].answers;
        setTotalAnswers(Object.keys(answerObj).length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${serverURL}/qa/questions/647006/answers`, {
      headers: headers,
      params: {
        page: 1,
        count: count
      }
    })
      .then((response) => {
        setCurrAnswerList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [count]);

  const handleLoadMoreAnswers = () => {
    currAnswerList.length < totalAnswers && setCount(totalAnswers);
    setIsExpanded(true);
  };

  const handleCollapseAnswers = () => {
    currAnswerList.length === totalAnswers && setCount(2);
    setIsExpanded(false);
  };

  return (
    <div>
      <h4>QUESTIONS AND ANSWERS</h4>
      <QuestionEntry />
      <AnswerList
        currAnswerList={ currAnswerList }
        serverURL={serverURL}
        headers={headers}
        totalAnswers={totalAnswers}
        handleLoadMoreAnswers={handleLoadMoreAnswers}
        handleCollapseAnswers={handleCollapseAnswers}
        isExpanded={isExpanded}
      />
    </div>
  )
}