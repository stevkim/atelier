require('dotenv').config();
import React, { useState, useEffect } from 'react';
import { answers } from './answersData.js';
import AnswerList from './AnswerList.jsx';
import axios from 'axios';

export default function QuestionsAndAnswers() {
  const [answerList, setAnswerList] = useState([]);

  const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
  const headers = { Authorization: process.env.GIT_TOKEN };

  useEffect(() => {
    axios.get(`${serverURL}/qa/questions/646801/answers`, { headers: headers })
      .then((response) => {
        setAnswerList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div>
      <h4>QUESTIONS AND ANSWERS</h4>
      <AnswerList answerList={ answerList } serverURL={serverURL} headers={headers} />
    </div>
  )
}