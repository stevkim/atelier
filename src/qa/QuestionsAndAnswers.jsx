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
      setDisplayCount(displayCount + 2);
    }
    setIsQuestionExpanded(true);
  };

  const handleInputChange = (e) => {
    e.target.value.length >= 3
      ? setTerm(e.target.value)
      : setTerm('');
  };

  useEffect(() => {
    getListOfQuestions(productId)
      .then((response) => {
        setTotalQuestions(response.data.results.length);
        setQuestionList(response.data.results);
        setCurrQuestionList(response.data.results.slice(0, displayCount));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId, displayCount]);

  return (
    <div className='qa-container'>
      <h2>QUESTIONS AND ANSWERS</h2>
      <div className='qa-search-container'>
        <input
          type='text'
          name='Search'
          placeholder='Have a question? Search for answers...'
          onChange={handleInputChange}
        />
      </div>
      <QuestionList
        currQuestionList={currQuestionList}
        isQuestionExpanded={isQuestionExpanded}
        term={term}
        productName={productName}
      />
      <div className='qa-button-container'>
        {
          totalQuestions > 2 && currQuestionList.length < totalQuestions
          && <button type='button' onClick={handleMoreQuestions}>More Questions</button>
        }
        <button type='button' onClick={() => { setIsModalOpen(true); }}>Add A Question</button>
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
