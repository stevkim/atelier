import React, { memo } from 'react';

const AddReviewHeader = ({ setModal, productName }) => (
  <>
    <div className='add-review-header'>
      <h1>Write Your Review</h1>
      <button type='button' className='add-review-close-button' onClick={() => setModal(false)} data-testid='close-modal'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' style={{ width: '1.5em', height: '1.5em' }}>
          <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
        </svg>
      </button>
    </div>
    <h4>{`About the [${productName}]`}</h4>
  </>
);

export default memo(AddReviewHeader);
