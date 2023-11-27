import React, { useState } from 'react';
import axios from 'axios';

export default function AddQuestionForm({ productId, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: productId,
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

  const validateForm = (form) => {
    const errors = [];
    if (!form.body || !form.name || !form.email) {
      errors.push('Please fill out the required fields');
    }
    if (form.email.length > 0 && isValidEmail(form.email) === false) {
      errors.push('Please make sure the email is formatted correctly');
    }
    return errors;
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    if (formErrors.length > 0) { return; }
    axios.post('/qa/questions', formData)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="qa-modal-container">
      <span className="qa-close-modal" onClick={() => { setIsModalOpen(false); }}>X</span>
      <div className="qa-form-heading">
        <h2>Ask Your Question</h2>
        <h4>About the [Product Name]</h4>
      </div>
      <div className="qa-form-container">
        <form onSubmit={handleAddQuestion}>
          <div className="qa-form-row">
            <label className="qa-input-label">
              Nickname
              <span className="qa-required-input">*</span>
            </label>
            <input
              className="qa-input"
              name="nickname-input"
              type="text"
              placeholder="Example: jackson11!"
              maxLength={60}
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }}
            />
            <p>For privacy reasons, do not use your full name or email address</p>
            <label className="qa-input-label">
              Email
              <span className="qa-required-input">*</span>
            </label>
            <input
              className="qa-input"
              name="email-input"
              type="text"
              placeholder="Example: jack@email.com"
              maxLength={60}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); }}
            />
            <p>For authentication reasons, you will not be emailed</p>
          </div>
          <div className="qa-form-row">
            <label className="qa-input-label">
              Question
              <span className="qa-required-input">*</span>
            </label>
            <textarea
              className="qa-input"
              name="question-input"
              type="text"
              maxLength={1000}
              onChange={(e) => { setFormData({ ...formData, body: e.target.value }); }}
            />
          </div>
          <input
            type="submit"
            value="Submit"
          />
          {
            formErrors.length > 0 && (
              <div className="qa-form-error-message">
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
}
