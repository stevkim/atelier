import React, { useState, useEffect } from 'react';
import { markQuestionHelpful, getListOfAnswers } from '../lib/fetchFunctions.js';
import AnswerList from './AnswerList.jsx';
import Modal from './Modal.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';

const QuestionEntry = ({ question, productName }) => {
  const { question_id, question_body, question_helpfulness, answers } = question;
  const [updateQuestionHelpfulness, setUpdateQuestionHelpfulness] = useState(question_helpfulness);
  const [isQuestionHelpful, setIsQuestionHelpful] = useState(false);
  const [currAnswerList, setCurrAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHelpfulQuestionClick = (id) => {
    if (!isQuestionHelpful) {
      markQuestionHelpful(id)
        .then(() => {
          setUpdateQuestionHelpfulness(updateQuestionHelpfulness + 1);
          setIsQuestionHelpful(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    getListOfAnswers(question_id, totalAnswers)
      .then((response) => {
        const sortedAnswerList = response.data.results.sort((a, b) => {
          const isSellerA = a.answerer_name === 'Seller';
          const isSellerB = b.answerer_name === 'Seller';

          if (isSellerA && !isSellerB) {
            return -1;
          } if (!isSellerA && isSellerB) {
            return 1;
          }
          return b.helpfulness - a.helpfulness;
        });
        setAnswerList(sortedAnswerList);
        setCurrAnswerList(sortedAnswerList.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='question-container'>
      <div className='question-header'>
        <div className='question-indicator' style={{ fontWeight: 'bold' }}>
          <div>Q:</div>
          <div>{question_body}</div>
        </div>
        <div className='question-details-container'>
          <div className='qa-helpful-container'>
            Helpful?
            <button
              type='button'
              id='helpful-question'
              title='helpfulQuestion'
              style={{ textDecoration: isQuestionHelpful ? 'none' : 'underline', cursor: isQuestionHelpful && 'default' }}
              onClick={() => { handleHelpfulQuestionClick(question_id); }}
            >
              Yes
            </button>
            (
            {updateQuestionHelpfulness}
            )
            |
            <button
              type='button'
              id='add-answer'
              style={{ textDecoration: 'underline' }}
              onClick={() => { setIsModalOpen(true); }}
            >
              Add Answer
            </button>
          </div>
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
      {
        isModalOpen && (
          <Modal>
            <AddAnswerForm questionId={question_id} questionBody={question_body} productName={productName} setIsModalOpen={setIsModalOpen} />
          </Modal>
        )
      }
    </div>
  );
};

export default QuestionEntry;
