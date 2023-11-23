require('dotenv').config();
import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList.jsx';
import axios from 'axios';
import './qaStyles.css';

export default function QuestionsAndAnswers() {
  const [currQuestionList, setCurrQuestionList] = useState([]);

  const serverURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
  const headers = { Authorization: process.env.GIT_TOKEN };

  useEffect(() => {
    axios.get(`${serverURL}/qa/questions/?product_id=40348&count=50`, { headers: headers })
      .then((response) => {
        setCurrQuestionList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h4>QUESTIONS AND ANSWERS</h4>
      <QuestionList
        currQuestionList={currQuestionList}
        serverURL={serverURL}
        headers={headers}
      />
    </div>
  )
}