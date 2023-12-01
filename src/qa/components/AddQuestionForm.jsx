import React, { useState } from 'react';
import { addQuestion } from '../lib/fetchFunctions.js';
import { validateForm } from '../lib/helperFunctions.js';

const AddQuestionForm = ({ productId, productName, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: productId,
  });
  const [formErrors, setFormErrors] = useState([]);

  const updateFormDataValue = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    if (formErrors.length) { return; }
    addQuestion(formData)
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
        <button type='button' onClick={() => { setIsModalOpen(false); }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='qa fill' title='CloseModal'>
            <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
          </svg>

        </button>
      </div>
      <div className='qa-form-heading'>
        <h2>ASK YOUR QUESTION</h2>
        <h4>{`About the ${productName}`}</h4>
      </div>
      <div className='qa-form-container'>
        <form title='questionForm' onSubmit={handleAddQuestion}>
          <label htmlFor='nickname-input'>
            <div className='qa-form-row'>
              Nickname
              <span className='qa-required-input'> *</span>
            </div>
            <div className='qa-form-row'>
              <input
                className='qa-input'
                type='text'
                placeholder='Example: jackson11!'
                maxLength={60}
                onChange={(e) => { updateFormDataValue(e, 'name'); }}
              />
            </div>
          </label>
            <p>For privacy reasons, do not use your full name or email address</p>
            <label htmlFor='email-input'>
              Email
              <span className='qa-required-input'> *</span>
              <input
                className='qa-input'
                type='text'
                placeholder='Example: jack@email.com'
                maxLength={60}
                onChange={(e) => { updateFormDataValue(e, 'email'); }}
              />
            </label>
            <p>For authentication reasons, you will not be emailed</p>
          <div className='qa-form-row'>
            <label htmlFor='question-input'>
              Question
              <span className='qa-required-input'> *</span>
              <textarea
                className='qa-input'
                type='text'
                placeholder='Why did you like the product or not?'
                maxLength={1000}
                onChange={(e) => { updateFormDataValue(e, 'body'); }}
              />
            </label>
          </div>
          <div className='qa-submit-form'>
            <button type='submit'>
              SUBMIT
            </button>
          </div>
          {
            formErrors.length > 0 && (
              <div className='qa-form-error-message'>
                You must enter the following:
                <ul>
                  {
                    formErrors.map((message) => <li key={message}>{message}</li>)
                  }
                </ul>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default AddQuestionForm;
