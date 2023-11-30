import React, { useState } from 'react';
import { addAnswer } from '../lib/fetchFunctions.js';
import { validateForm } from '../lib/helperFunctions.js';

const AddAnswerForm = ({ questionId, questionBody, productName, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
  });

  const [formErrors, setFormErrors] = useState([]);

  const updateFormDataValue = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    if (formErrors.length) { return; }
    addAnswer(questionId, formData)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='qa-modal-container'>
      <div className='qa-close-modal'>
        <button type='button' id='close-modal' onClick={() => { setIsModalOpen(false); }}>X</button>
      </div>
      <div className='qa-form-heading'>
        <h2>SUBMIT YOUR ANSWER</h2>
        <h4>
          {`${productName}: ${questionBody}`}
        </h4>
      </div>
      <div className='qa-form-container'>
        <form title='answerForm' onSubmit={handleAddAnswer}>
          <div className='qa-form-row'>
            <label
              htmlFor='nickname-input'
              className='qa-input-label'
            >
              Nickname
              <span className='qa-required-input'> *</span>
            </label>
            <input
              id='nickname-input'
              className='qa-input'
              name='nickname-input'
              type='text'
              placeholder='Example: jack543!'
              maxLength={60}
              onChange={(e) => { updateFormDataValue(e, 'name'); }}
            />
            <p>For privacy reasons, do not use your full name or email address</p>
          </div>
          <div className='qa-form-row'>
            <label
              htmlFor='email-input'
              className='qa-input-label'
            >
              Email
              <span className='qa-required-input'> *</span>
            </label>
            <input
              id='email-input'
              className='qa-input'
              name='email-input'
              type='text'
              placeholder='Example: jack@email.com'
              maxLength={60}
              onChange={(e) => { updateFormDataValue(e, 'email'); }}
            />
            <p>For authentication reasons, you will not be emailed</p>
          </div>
          <div className='qa-form-row'>
            <label
              htmlFor='answer-input'
              className='qa-input-label'
            >
              Answer
              <span className='qa-required-input'> *</span>
            </label>
            <textarea
              id='answer-input'
              className='qa-input'
              name='answer-input'
              type='text'
              maxLength={1000}
              onChange={(e) => { updateFormDataValue(e, 'body'); }}
            />
          </div>
          <button type='submit' id='submit-answer'>
            Submit
          </button>
          {
            formErrors.length > 0 && (
              <div className='qa-form-error-messages'>
                <ul>
                  {formErrors.map((message) => (<li key={message}>{message}</li>))}
                </ul>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default AddAnswerForm;
