import React from 'react';

const BackToTopButton = ({ scrollToTop }) => (
  <button type='button' className='back-to-top' onClick={scrollToTop}>
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' style={{ width: '1.5em', height: '1.5em' }}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
    </svg>
  </button>
);

export default BackToTopButton;
