import React from "react";

const EmailForm = ({ checkValid, setEmail }) => (
  <>
    <div className='input-wrapper-row'>
      <p>Email: </p>
      <input
        type='email'
        placeholder='Example: jackson11@email.com'
        onChange={(e) => setEmail('email', e.target.value)}
        onBlur={(e) => checkValid(e, 'email')}
      />
    </div>
    <sub>For authentication reasons, you will not be emailed</sub>
  </>
)

export default EmailForm;
