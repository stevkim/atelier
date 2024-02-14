import React from "react";

const UsernameForm = ({ setUsername }) => (
  <>
    <div className='input-wrapper-row'>
      <p>Username: </p>
      <input
        type='text'
        placeholder='Example: jackson11!'
        onChange={(e) => setUsername('name', e.target.value)}
      />
    </div>
    <sub>For privacy reasons, do not use your full name or email address</sub>
  </>
);

export default UsernameForm;
