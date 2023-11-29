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
        <button type='button' id='close-modal' onClick={() => { setIsModalOpen(false); }}>X</button>
      </div>
      <div className='qa-form-heading'>
        <h2>ASK YOUR QUESTION</h2>
        <h4>{`About the ${productName}`}</h4>
      </div>
      <div className='qa-form-container'>
        <form title='questionForm' onSubmit={handleAddQuestion}>
          <div className='qa-form-row'>
            <label htmlFor='nickname-input' className='qa-input-label'>
              Nickname
              <span className='qa-required-input'> *</span>
            </label>
            <input
              id='nickname-input'
              className='qa-input'
              name='nickname-input'
              type='text'
              placeholder='Example: jackson11!'
              maxLength={60}
              onChange={(e) => { updateFormDataValue(e, 'name'); }}
            />
            <p>For privacy reasons, do not use your full name or email address</p>
            <label htmlFor='email-input' className='qa-input-label'>
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
            <label htmlFor='question-input' className='qa-input-label'>
              Question
              <span className='qa-required-input'> *</span>
            </label>
            <textarea
              id='question-input'
              className='qa-input'
              name='question-input'
              type='text'
              placeholder='Why did you like the product or not?'
              maxLength={1000}
              onChange={(e) => { updateFormDataValue(e, 'body'); }}
            />
          </div>
          <button type='submit' id='submit-question'>
            Submit
          </button>
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
