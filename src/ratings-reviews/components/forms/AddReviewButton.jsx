import React from 'react';

const AddReviewButton = ({ setModal }) => (
  <button className='add-review-button' type='button' onClick={() => setModal(true)}>
    ADD A REVIEW
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' style={{ width: '1.5em', height: '1.5em' }}>
      <path fillRule='evenodd' d='M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z' clipRule='evenodd' />
    </svg>
  </button>
);

export default AddReviewButton;
