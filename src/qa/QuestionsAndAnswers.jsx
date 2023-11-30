import React, { useState, useEffect } from 'react';
import { getListOfQuestions } from './lib/fetchFunctions.js';
import QuestionList from './components/QuestionList.jsx';
import Modal from './components/Modal.jsx';
import AddQuestionForm from './components/AddQuestionForm.jsx';
import './qaStyles.css';

const QuestionsAndAnswers = ({ productId, productName }) => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [currQuestionList, setCurrQuestionList] = useState([]);
  const [displayCount, setDisplayCount] = useState(2);
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  const [term, setTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreQuestions = () => {
    if (totalQuestions !== displayCount) {
      setDisplayCount((prevCount) => prevCount + 2);
      setCurrQuestionList((prevList) => questionList.slice(0, prevList.length + 2));
    }
    setIsQuestionExpanded(true);
  };

  const handleInputChange = (e) => {
    e.target.value.length >= 3
      ? setTerm(e.target.value.toLowerCase())
      : setTerm('');
  };

  useEffect(() => {
    getListOfQuestions(productId)
      .then((response) => {
        let filteredList;

        if (term) {
          filteredList = response.data.results.filter((question) => question.question_body.toLowerCase().includes(term));
        } else {
          filteredList = response.data.results;
        }

        setTotalQuestions(filteredList.length);
        setQuestionList(filteredList);
        setCurrQuestionList(filteredList.slice(0, displayCount));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId, term]);

  return (
    <div id='questions-answers' className='qa-container'>
      <h2>QUESTIONS AND ANSWERS</h2>
      <div className='qa-search-container'>
        <input
          type='text'
          name='Search'
          placeholder='Have a question? Search for answers...'
          onChange={handleInputChange}
        />
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='search-icon'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
        </svg>
      </div>
      <QuestionList
        currQuestionList={currQuestionList}
        isQuestionExpanded={isQuestionExpanded}
        productName={productName}
      />
      <div className='qa-button-container'>
        {
          totalQuestions > 2 && currQuestionList.length < totalQuestions
          && <button type='button' id='more-questions' onClick={handleMoreQuestions}>More Questions</button>
        }
        <button type='button' id='add-question' onClick={() => { setIsModalOpen(true); }}>Add A Question</button>
      </div>
      {isModalOpen
        && (
        <Modal>
          <AddQuestionForm productId={productId} productName={productName} setIsModalOpen={setIsModalOpen} />
        </Modal>
        )}
    </div>
  );
};

export default QuestionsAndAnswers;
