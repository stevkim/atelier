import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './components/QuestionList.jsx';
import Modal from './components/Modal.jsx';
import AddQuestionForm from './components/AddQuestionForm.jsx';
import './qaStyles.css';

const QuestionsAndAnswers = ({ productId }) => {
  const [currQuestionList, setCurrQuestionList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [displayCount, setDisplayCount] = useState(2);
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
    axios.get(`/qa/questions/?product_id=${productId}&count=200`)
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
      <h4>QUESTIONS AND ANSWERS</h4>
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
          <AddQuestionForm productId={productId} setIsModalOpen={setIsModalOpen} />
        </Modal>
        )}
    </div>
  );
};

export default QuestionsAndAnswers;
