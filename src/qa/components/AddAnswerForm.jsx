import React, { useState } from 'react';

export default function AddAnswerForm({ questionId, questionBody, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
  });

  const [formErrors, setFormErrors] = useState([]);

  const isValidEmail = (email) => {
    if (email.indexOf('@') === -1) {
      return false;
    }

    const fromIndex = email.indexOf('@') + 1;
    if (email.indexOf('.', fromIndex) === -1) {
      return false;
    }

    return true;
  };

  return (
    <div className='qa-modal-container'>
      <div className='qa-close-modal'>
        <button onClick={() => { setIsModalOpen(false); }}>X</button>
      </div>
      <div className='qa-form-heading'>
        <h2>SUBMIT YOUR ANSWER</h2>
        <h4>[Product Name]: {questionBody}</h4>
      </div>
      <div className='qa-form-container'>
        <form>
          <div className='qa-form-row'>
            <label
              htmlFor='nickname-input'
              className='qa-input-label'>
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
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }}
            />
            <p>For privacy reasons, do not use your full name or email address</p>
          </div>
          <div className='qa-form-row'>
            <label
              htmlFor='email-input'
              className='qa-input-label'>
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
              onChange={(e) => { setIsModalOpen({ ...formData, email: e.target.value }); }}
            />
            <p>For authentication reasons, you will not be emailed</p>
          </div>
          <div className='qa-form-row'>
            <label
              htmlFor='answer-input'
              className='qa-input-label'>
              Answer
              <span className='qa-required-input'> *</span>
            </label>
            <textarea
              id='answer-input'
              className='qa-input'
              name='answer-input'
              type='text'
              maxLength={1000}
              onChange={(e) => { setFormData({ ...formData, body: e.target.value }); }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
