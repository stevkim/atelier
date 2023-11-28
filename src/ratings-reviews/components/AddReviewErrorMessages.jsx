import React, { memo } from 'react';

const AddReviewErrorMessages = ({ messages }) => (
  <div className='error-message'>
    You must enter the following:
    <ul>
      {
        messages.map((text) => <li key={text}>{text}</li>)
      }
    </ul>
  </div>
);

export default memo(AddReviewErrorMessages);
