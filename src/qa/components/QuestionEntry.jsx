import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AnswerList from './AnswerList.jsx';

export default function QuestionEntry({ question }) {
  const { question_id, question_body, question_helpfulness, answers } = question;
  const [updateQuestionHelpfulness, setUpdateQuestionHelpfulness] = useState(question_helpfulness);
  const [isQuestionHelpful, setIsQuestionHelpful] = useState(false);
  const [currAnswerList, setCurrAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);

  const handleHelpfulQuestionClick = (id) => {
    !isQuestionHelpful &&
    axios.put(`/qa/questions/${id}/helpful`, null)
      .then(() => {
        setUpdateQuestionHelpfulness(updateQuestionHelpfulness + 1);
        setIsQuestionHelpful(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalAnswers = Object.keys(answers).length;

  const handleLoadMoreAnswers = () => {
    setCurrAnswerList(answerList);
    setIsAnswerExpanded(true);
  };

  const handleCollapseAnswers = () => {
    setCurrAnswerList(answerList.slice(0, 2));
    setIsAnswerExpanded(false);
  };

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers/?count=${totalAnswers}`)
      .then((response) => {
        const sortedAnswerList = response.data.results.sort((a,b) => {
          const isSellerA = a.answerer_name === 'Seller';
          const isSellerB = b.answerer_name === 'Seller';

          if (isSellerA && !isSellerB) {
            return -1;
          } else if (!isSellerA && isSellerB) {
            return 1;
          } else {
            return b.helpfulness - a.helpfulness;
          }
        })
        setAnswerList(sortedAnswerList);
        setCurrAnswerList(sortedAnswerList.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className='question-container'>
      <div className='question-header'>
        <div className='question-indicator' style={{ fontWeight: 'bold' }}>
          <div>Q:</div>
          <div>{question_body}</div>
        </div>
        <div className='question-details-container'>
          <span className='helpful-container'>
            <span>Helpful?</span>
            <span
              className='yes'
              style={{ textDecoration: isQuestionHelpful ? 'none' : 'underline', cursor: isQuestionHelpful && 'default'}}
              onClick={() => {handleHelpfulQuestionClick(question_id)}}>
              Yes
            </span>
            <span>({updateQuestionHelpfulness})</span>|
            <span className='add-answer' style={{textDecoration: 'underline'}}>Add Answer</span>
          </span>
        </div>
      </div>
      <div className='answer-indicator'>
        {totalAnswers > 0 && <div style={{ fontWeight: 'bold' }}>A:</div>}
        <AnswerList
          currAnswerList={currAnswerList}
          totalAnswers={totalAnswers}
          handleLoadMoreAnswers={handleLoadMoreAnswers}
          handleCollapseAnswers={handleCollapseAnswers}
          isAnswerExpanded={isAnswerExpanded}
        />
      </div>
    </div>
  )
}